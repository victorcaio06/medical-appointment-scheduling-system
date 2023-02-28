import { Router } from "express";
import { authenticateUserController } from "../modules/users/useCases/authenticateUser";
import { createUserController } from "../modules/users/useCases/createUser";

const userRouter = Router();

userRouter.post("/login", async (request, response) => {
  await authenticateUserController.handle(request, response);
});

userRouter.post("/users", async (request, response) => {
  await createUserController.handle(request, response);
});

export { userRouter };
