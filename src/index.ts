import express from "express";
import "dotenv/config";
import indexRoutes from "../src/routes/indexRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
const { PORT } = process.env;

app.set("PORT", PORT);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api", indexRoutes);
app.listen(PORT, () => {
  console.log(`Iniciado en el puerto ${PORT}`);
});
