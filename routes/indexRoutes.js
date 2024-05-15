"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Productos_route_1 = __importDefault(require("./Productos.route"));
const Categorias_route_1 = __importDefault(require("./Categorias.route"));
const Carritos_route_1 = __importDefault(require("./Carritos.route"));
const Usuarios_route_1 = __importDefault(require("./Usuarios.route"));
const router = (0, express_1.Router)();
router.use("/productos", Productos_route_1.default);
router.use("/categorias", Categorias_route_1.default);
router.use("/carritos", Carritos_route_1.default);
router.use("/usuarios", Usuarios_route_1.default);
exports.default = router;
