import { Sequelize } from "sequelize";
import "dotenv/config";

const { NAME_DB, USER_DB, PASSWORD_DB, HOST_DB, PORT_DB }: any = process.env;

const sequelize = new Sequelize(NAME_DB, USER_DB, PASSWORD_DB, {
  host: HOST_DB,
  port: Number(PORT_DB),
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("conectado correctamente a la base de datos"))
  .catch((err) => console.log(err));

export default sequelize;
