import { Router } from "express";
import Controller from "../controller/Controller";
import Usuarios from "../models/Usuarios";
import { signToken, verifyAuth } from "../middleware/auth";

const router = Router();

class controllerUser extends Controller {
  constructor(modelo: any) {
    super(modelo);
  }
  checkAuth = async (req: any, res: any) => {
    const { user, password } = req.body;
    if (!user || !password) {
      return res
        .status(400)
        .json({ error: "correo o contraseña no proporcionados" });
    }
    try {
      const usuario = await controller.modelo.findOne({
        where: { user: user },
      });
      if (!usuario) {
        throw { msg: "Usuario no encontrado" };
      }

      const autenticacion = await usuario.authenticate(password);

      if (!autenticacion) {
        throw { msg: "Contraseña incorrecta" };
      }
      if (autenticacion) {
        const { password, ...todo } = usuario.dataValues;
        const token = await signToken(usuario.dataValues);
        return res
          .status(200)
          .json({ success: true, response: { ...todo, token } });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  };
}
const controller = new controllerUser(Usuarios);

router.get("/", verifyAuth, controller.obtener);
router.post("/crear", verifyAuth, controller.insertar);
router.post("/login", controller.checkAuth);

export default router;
