"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const { PORT } = process.env;
app.set("PORT", PORT);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.use("/api", indexRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Iniciado en el puerto ${PORT}`);
});
