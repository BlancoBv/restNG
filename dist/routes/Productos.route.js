"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("../controller/Controller"));
const Productos_1 = __importDefault(require("../models/Productos"));
const router = (0, express_1.Router)();
const controller = new Controller_1.default(Productos_1.default);
router.get("/", controller.obtener);
router.post("/crear", controller.insertar);
router.get("/obtener/:idproducto", (req, res) => controller.obtenerUno(req, res, "idproducto"));
exports.default = router;
