import { Router } from "express";
import { CreateUserController } from "../useCases/createUser/createUserController";

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post("/users", createUserController.handle);

export { userRouter };
