import express from "express";
import { specialtyRouter } from "./routes/specialty.routes";
import { userRouter } from "./routes/user.routes";

const app = express();

app.use(express.json());

const port = 3434;

app.use(userRouter);
app.use(specialtyRouter);

app.listen(port, () => console.log("Server is running on PORT 3434!"));
