import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";

import { logger } from "../../../../utils/logger";

import { IUserRepository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "./createUserUseCase";

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async handle(request: Request, response: Response) {
    const data = request.body;

    const createUserUseCase = new CreateUserUseCase(
      this.userRepository,
      this.passwordCrypto
    );

    try {
      const result = await createUserUseCase.execute(data);

      return response.status(201).json(result);
    } catch (err: any) {
      logger.error(err.stack);

      return response.status(err.statusCode).json({ ERROR: err.message });
    }
  }
}
