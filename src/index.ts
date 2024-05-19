import express from "express";
import "dotenv/config";
import indexRoutes from "./routes/indexRoutes";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
const { PORT } = process.env;

app.set("PORT", PORT);
app.enable("trust proxy");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  morgan(
    ":remote-addr :method :url :status :res[content-length] :response-time ms"
  )
);
app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/api", indexRoutes);
app.listen(PORT, () => {
  console.log(`Iniciado en el puerto ${PORT}`);
});
