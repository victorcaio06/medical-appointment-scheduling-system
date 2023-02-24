import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const data = request.body;

    const createUserUseCase = new CreateUserUseCase();

    try {
      const result = await createUserUseCase.execute(data);

      return response.status(201).json(result);
    } catch (err: any) {
      response.status(404).json({
        message: err.message,
      });
    }
  }
}
