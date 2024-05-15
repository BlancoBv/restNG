import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Productos = sequelize.define("productos", {
  idproducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
  },
  idcategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  existencias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

export default Productos;
