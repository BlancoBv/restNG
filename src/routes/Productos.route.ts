import { Router } from "express";
import Controller from "../controller/Controller";
import Productos from "../models/Productos";
import { verifyAuth } from "../middleware/auth";

const router = Router();
const controller = new Controller(Productos);

router.get("/", controller.obtener);
router.post("/crear", verifyAuth, controller.insertar);
router.get("/obtener/:idproducto", (req, res) =>
  controller.obtenerUno(req, res, "idproducto")
);

export default router;
