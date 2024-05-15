"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const Productos = db_config_1.default.define("productos", {
    idproducto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    precioUnitario: {
        type: sequelize_1.DataTypes.DECIMAL(3, 2),
        allowNull: false,
    },
    idcategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    existencias: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
});
exports.default = Productos;
