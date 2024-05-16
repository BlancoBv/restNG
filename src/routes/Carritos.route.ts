import { Router } from "express";
import Controller from "../controller/Controller";
import Carritos from "../models/Carritos";
import Productos from "../models/Productos";
import { verifyAuth } from "../middleware/auth";

const router = Router();

class ControllerCarritos extends Controller {
  constructor(modelo: any) {
    super(modelo);
  }

  generateCart = async (req: any, res: any) => {
    const { body } = req;
    const existencias: any = [];
    let noExistencias = false;

    try {
      /*  body.productos.forEach((id: number) => {
        const response = Productos.findOne({
          where: { idproducto: id },
        }).then((res) => res);
        existencias.push(response);
      }); */
      for (const index in body.productos) {
        const id = body.productos[index][0].idproducto;

        console.log(body.productos[index][0].length);

        const response = await Productos.findOne({
          where: { idproducto: id },
        });

        if (response?.dataValues.existencias <= body.productos[index].length) {
          noExistencias = true;
        }
      } //comprueba la existencia de los productos

      console.log(existencias);

      if (noExistencias) {
        throw "Algun producto sin existencias";
      }
      //empieza a decrementar las existencias
      body.productos.forEach(async (element: { idproducto: number }[]) => {
        const response = await Productos.findOne({
          where: { idproducto: element[0].idproducto },
        });
        await response?.decrement({ existencias: element.length });
      });

      const response = await this.modelo.create({
        ...body,
        productos: JSON.stringify(body.productos),
      });

      return res.status(200).json({ success: true, response });
    } catch (error) {
      return res.status(403).json({ success: false, error });
    }
  };

  autorizarCart = async (req: any, res: any, target: string) => {
    try {
      const response = await this.modelo.findOne({
        where: { [target]: req.params[target] },
      });
      await response.update({
        entregado: true,
        autorizadoPor: req.body.idUser,
      });
      res.status(200).json(response);
    } catch (error) {
      return res.status(403).json({ success: false, error });
    }
  };
}

const controller = new ControllerCarritos(Carritos);

router.get("/", controller.obtener);
router.post("/crear", controller.generateCart);
router.put("/autorizar/:idcarritos", verifyAuth, (req, res) =>
  controller.autorizarCart(req, res, "idcarritos")
);

export default router;
