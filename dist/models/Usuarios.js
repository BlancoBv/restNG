"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
// @ts-ignore
const sequelize_bcrypt_1 = __importDefault(require("sequelize-bcrypt"));
const Usuarios = db_config_1.default.define("usuarios", {
    idusuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    user: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    rol: {
        type: sequelize_1.DataTypes.ENUM("admin", "repartidor"),
    },
});
(0, sequelize_bcrypt_1.default)(Usuarios, {
    field: "password",
    rounds: 12,
    compare: "authenticate",
});
exports.default = Usuarios;
