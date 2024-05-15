import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Usuarios = sequelize.define("usuarios", {
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

export default Usuarios;
