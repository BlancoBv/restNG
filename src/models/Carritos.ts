import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Carritos = sequelize.define("carritos", {
  idcarritos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  num_tel: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  entregado: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  autorizadoPor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  productos: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Carritos;
