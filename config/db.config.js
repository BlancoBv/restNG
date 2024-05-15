"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const { NAME_DB, USER_DB, PASSWORD_DB, HOST_DB, PORT_DB } = process.env;
const sequelize = new sequelize_1.Sequelize(NAME_DB, USER_DB, PASSWORD_DB, {
    host: HOST_DB,
    port: Number(PORT_DB),
    dialect: "mysql",
});
sequelize
    .authenticate()
    .then(() => console.log("conectado correctamente a la base de datos"))
    .catch((err) => console.log(err));
exports.default = sequelize;
