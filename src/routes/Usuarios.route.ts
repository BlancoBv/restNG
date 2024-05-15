import { Router } from "express";
import Controller from "../controller/Controller";
import Usuarios from "../models/Usuarios";

const router = Router();
const controller = new Controller(Usuarios);

router.get("/", controller.obtener);
router.post("/crear", controller.insertar);
router.get("/obtener/:idproducto", (req, res) =>
  controller.obtenerUno(req, res, "idproducto")
);

export default router;
