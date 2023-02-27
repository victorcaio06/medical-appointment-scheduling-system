import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocument from "../swagger.json";

import { CustomError } from "./errors/custom.error";
import { prismaClient } from "./infra/database/prisma.config";

import { specialtyRouter } from "./routes/specialty.routes";
import { userRouter } from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = 3434;

app.use(userRouter);
app.use(specialtyRouter);

try {
  prismaClient.$connect();
} catch (err) {
  throw new CustomError("SERVER OFF", 500, "SERVER_OFF_ERROR");
}

app.listen(port, () => console.log("Server is running on PORT 3434!"));
