import { Router } from "express";
import Productos from "./Productos.route";
import Categorias from "./Categorias.route";
import Carritos from "./Carritos.route";
import Usuarios from "./Usuarios.route";

const router = Router();

router.use("/productos", Productos);
router.use("/categorias", Categorias);
router.use("/carritos", Carritos);
router.use("/usuarios", Usuarios);
router.get("/status", (_req, res) =>
  res.status(200).json({ msg: "Funcionando" })
);

export default router;