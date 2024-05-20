"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../controller/Controller"));
const Usuarios_1 = __importDefault(require("../models/Usuarios"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
class controllerUser extends Controller_1.default {
    constructor(modelo) {
        super(modelo);
        this.checkAuth = async (req, res) => {
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
                    const token = await (0, auth_1.signToken)(usuario.dataValues);
                    return res
                        .status(200)
                        .json({ success: true, response: { ...todo, token } });
                }
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        };
    }
}
const controller = new controllerUser(Usuarios_1.default);
router.get("/", auth_1.verifyAuth, controller.obtener);
router.post("/crear", auth_1.verifyAuth, controller.insertar);
router.post("/login", controller.checkAuth);
exports.default = router;
