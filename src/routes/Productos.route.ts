import { Router } from "express";
import Controller from "../controller/Controller";
import Productos from "../models/Productos";

const router = Router();
const controller = new Controller(Productos);

router.get("/", controller.obtener);
router.post("/crear", controller.insertar);
router.get("/obtener/:idproducto", (req, res) =>
  controller.obtenerUno(req, res, "idproducto")
);

export default router;
