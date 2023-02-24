import express from "express";
import { userRouter } from "./routes/user.routes";

const app = express();

app.use(express.json());

const port = 3434;

app.use(userRouter);

app.listen(port, () => console.log("Server is running on PORT 3434!"));
