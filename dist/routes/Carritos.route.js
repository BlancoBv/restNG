"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../controller/Controller"));
const Carritos_1 = __importDefault(require("../models/Carritos"));
const Productos_1 = __importDefault(require("../models/Productos"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
class ControllerCarritos extends Controller_1.default {
    constructor(modelo) {
        super(modelo);
        this.generateCart = async (req, res) => {
            const { body } = req;
            let noExistencias = false;
            try {
                for (const index in body.productos) {
                    const id = body.productos[index][0].idproducto;
                    const response = await Productos_1.default.findOne({
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
                body.productos.forEach(async (element) => {
                    const response = await Productos_1.default.findOne({
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
                return res.status(200).json({ success: true, response });
            }
            catch (error) {
                return res.status(403).json({ success: false, error });
            }
        };
        this.autorizarCart = async (req, res, target) => {
            try {
                const response = await this.modelo.findOne({
                    where: { [target]: req.params[target] },
                });
                await response.update({
                    entregado: true,
                    autorizadoPor: req.body.idUser,
                });
                res.status(200).json(response);
            }
            catch (error) {
                return res.status(403).json({ success: false, error });
            }
        };
        this.cancelarCart = async (req, res, target) => {
            try {
                const response = await this.modelo.findOne({
                    where: { [target]: req.params[target] },
                });
                const productos = JSON.parse(response.dataValues.productos);
                for (const index in productos) {
                    const idproducto = productos[index][0].idproducto;
                    const response = await Productos_1.default.findOne({ where: { idproducto } });
                    await response?.increment({ existencias: productos[index].length });
                }
                await response.update({
                    cancelado: true,
                });
                res.status(200).json(response);
            }
            catch (error) {
                return res.status(403).json({ success: false, error });
            }
        };
    }
}
const controller = new ControllerCarritos(Carritos_1.default);
router.get("/", (req, res) => controller.obtener(req, res, {
    order: [["idcarritos", "DESC"]],
}));
router.get("/obtener/:num_tel", (req, res) => controller.obtener(req, res, {
    where: { num_tel: req.params.num_tel },
    order: [["idcarritos", "DESC"]],
}));
router.post("/crear", controller.generateCart);
router.put("/autorizar/:idcarritos", auth_1.verifyAuth, (req, res) => controller.autorizarCart(req, res, "idcarritos"));
router.put("/cancelar/:idcarritos", auth_1.verifyAuth, (req, res) => controller.cancelarCart(req, res, "idcarritos"));
exports.default = router;
