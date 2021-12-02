import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { initDb } from "./db";
import * as swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import path from "path";

initDb();
export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

RegisterRoutes(app);
if (process.env.NODE_ENV === "development") {
  const swagger = require("./swagger.json");
  try {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));
  } catch (err) {
    console.error("unable to read swagger.json", err);
  }
}
