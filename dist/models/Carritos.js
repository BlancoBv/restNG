"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const Carritos = db_config_1.default.define("carritos", {
    idcarritos: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    num_tel: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    entregado: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    autorizadoPor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    productos: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Carritos;
