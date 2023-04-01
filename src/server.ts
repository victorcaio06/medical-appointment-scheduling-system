import express from "express";
import { config } from "dotenv";
import swaggerUI from "swagger-ui-express";

import swaggerDocument from "../swagger.json";

import { CustomError } from "./errors/custom.error";
import { prismaClient } from "./infra/database/prisma.config";
import { router } from "./routes";

import "./infra/cron/notification-appointments-day.cron";

const app = express();

app.use(express.json());

config();

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(router);

const port = 3434;

try {
  prismaClient.$connect();
} catch (err) {
  throw new CustomError("SERVER OFF", 500, "SERVER_OFF_ERROR");
}

app.listen(port, () => console.log("Server is running on PORT 3434!"));
