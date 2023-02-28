import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async handle(request: Request, response: Response) {
    const data = request.body;

    try {
      const authenticateUserUseCase = new AuthenticateUserUseCase(
        this.userRepository,
        this.passwordCrypto,
        this.token
      );

      const result = await authenticateUserUseCase.execute(data);

      return response.status(200).json(result);
    } catch (err: any) {
      return response.status(err.statusCode).json({
        ERROR: err.message,
      });
    }
  }
}
