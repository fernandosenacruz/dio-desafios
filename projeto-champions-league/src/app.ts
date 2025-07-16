import express, { Application } from "express";
import * as routes from "./routes/index";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes.playersRouter);

export default app;
