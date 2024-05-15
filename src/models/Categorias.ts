import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import Productos from "./Productos";

const Categorias = sequelize.define("categorias", {
  idcategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

Categorias.hasMany(Productos, { foreignKey: "idcategoria" });
Productos.belongsTo(Categorias, { foreignKey: "idcategoria" });

export default Categorias;
