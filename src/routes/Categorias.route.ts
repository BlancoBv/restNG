import { Router } from "express";
import Controller from "../controller/Controller";
import Categorias from "../models/Categorias";
import Productos from "../models/Productos";
import { verifyAuth } from "../middleware/auth";

const router = Router();
const controller = new Controller(Categorias);

router.get("/", controller.obtener);
router.post("/crear", verifyAuth, controller.insertar);
router.get("/obtener/:idcategoria", (req, res) =>
  controller.obtener(req, res, {
    where: { idcategoria: req.params.idcategoria },
    include: [Productos],
  })
);

export default router;
