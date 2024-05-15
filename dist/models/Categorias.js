"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
const Productos_1 = __importDefault(require("./Productos"));
const Categorias = db_config_1.default.define("categorias", {
    idcategoria: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
});
Categorias.hasMany(Productos_1.default, { foreignKey: "idcategoria" });
Productos_1.default.belongsTo(Categorias, { foreignKey: "idcategoria" });
exports.default = Categorias;
