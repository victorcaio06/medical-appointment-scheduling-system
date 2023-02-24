import { Request, Response } from "express";

import { logger } from "../../../../utils/logger";

import { IUserRepository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "./createUserUseCase";

export class CreateUserController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    const data = request.body;

    const createUserUseCase = new CreateUserUseCase(this.userRepository);

    try {
      const result = await createUserUseCase.execute(data);

      return response.status(201).json(result);
    } catch (err: any) {
      logger.error(err.stack);

      response.status(err.statusCode ? err.statusCode : 400).json(err.message);
    }
  }
}
