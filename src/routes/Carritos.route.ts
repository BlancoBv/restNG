import { Router } from "express";
import Controller from "../controller/Controller";
import Carritos from "../models/Carritos";
import Productos from "../models/Productos";
import { verifyAuth } from "../middleware/auth";
import whatsappApi from "../utils/whatsappAPI";

const router = Router();

class ControllerCarritos extends Controller {
  constructor(modelo: any) {
    super(modelo);
  }

  generateCart = async (req: any, res: any) => {
    const { body } = req;
    let noExistencias = false;

    try {
      for (const index in body.productos) {
        const id = body.productos[index][0].idproducto;

        const response = await Productos.findOne({
          where: { idproducto: id },
        });

        if (response?.dataValues.existencias < body.productos[index].length) {
          noExistencias = true;
        }
      } //comprueba la existencia de los productos

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
        autorizadoPor: null,
        entregado: false,
        cancelado: false,
        productos: JSON.stringify(body.productos),
      });

      await whatsappApi(
        `Orden: ${response.dataValues.idcarritos}\n
        Nombre del cliente: ${body.nombreCliente}\n
        Num. de telefono: ${body.num_tel}\n
        ${body.productos
          .map((el: any) => `${el.length} x ${el[0].nombre}`)
          .join("\n")}`
      );
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
  cancelarCart = async (req: any, res: any, target: string) => {
    try {
      const response = await this.modelo.findOne({
        where: { [target]: req.params[target] },
      });
      const productos = JSON.parse(response.dataValues.productos);

      for (const index in productos) {
        const idproducto = productos[index][0].idproducto;

        const response = await Productos.findOne({ where: { idproducto } });
        await response?.increment({ existencias: productos[index].length });
      }

      await response.update({
        cancelado: true,
      });
      res.status(200).json(response);
    } catch (error) {
      return res.status(403).json({ success: false, error });
    }
  };
}

const controller = new ControllerCarritos(Carritos);

router.get("/", (req, res) =>
  controller.obtener(req, res, {
    order: [["idcarritos", "DESC"]],
    where: req.query.hasOwnProperty("entregados")
      ? { entregado: Number(req.query.entregados) === 1 ? true : false }
      : {},
  })
);
router.get("/obtener/:num_tel", (req, res) =>
  controller.obtener(req, res, {
    where: { num_tel: req.params.num_tel },
    order: [["idcarritos", "DESC"]],
  })
);
router.post("/crear", controller.generateCart);
router.put("/autorizar/:idcarritos", verifyAuth, (req, res) =>
  controller.autorizarCart(req, res, "idcarritos")
);
router.put("/cancelar/:idcarritos", verifyAuth, (req, res) =>
  controller.cancelarCart(req, res, "idcarritos")
);

export default router;
