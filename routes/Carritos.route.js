"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../controller/Controller"));
const Carritos_1 = __importDefault(require("../models/Carritos"));
const Productos_1 = __importDefault(require("../models/Productos"));
const router = (0, express_1.Router)();
class ControllerCarritos extends Controller_1.default {
    constructor(modelo) {
        super(modelo);
        this.generateCart = async (req, res) => {
            const { body } = req;
            const existencias = [];
            let noExistencias = false;
            try {
                /*  body.productos.forEach((id: number) => {
                  const response = Productos.findOne({
                    where: { idproducto: id },
                  }).then((res) => res);
                  existencias.push(response);
                }); */
                for (const id in body.productos) {
                    const response = await Productos_1.default.findOne({
                        where: { idproducto: id },
                    });
                    if (response?.dataValues.existencias <= 0 ||
                        response?.dataValues.existencias < body.cantidad) {
                        noExistencias = true;
                    }
                } //comprueba la existencia de los productos
                console.log(existencias);
                if (noExistencias) {
                    throw "Algun producto sin existencias";
                }
                //empieza a decrementar las existencias
                body.productos.forEach(async (id) => {
                    const response = await Productos_1.default.findOne({
                        where: { idproducto: id },
                    });
                    await response?.decrement({ existencias: 1 });
                });
                const response = await this.modelo.create({
                    ...body,
                    productos: JSON.stringify(body.productos),
                });
                return res.status(200).json({ success: true, response });
            }
            catch (error) {
                return res.status(403).json({ success: false, error });
            }
            console.log(body);
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
    }
}
const controller = new ControllerCarritos(Carritos_1.default);
router.get("/", controller.obtener);
router.post("/crear", controller.generateCart);
router.put("/autorizar/:idcarritos", (req, res) => controller.autorizarCart(req, res, "idcarritos"));
exports.default = router;
