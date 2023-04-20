import { sign } from "jsonwebtoken";

import { CustomError } from "../../../../errors/custom.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";
import {
  CreateConnectionRedis,
  RedisTypeClient,
} from "../../../../infra/providers/redis";

type AuthenticateRequest = {
  username: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken,
    private redisClient: CreateConnectionRedis
  ) {}

  async execute({ username, password }: AuthenticateRequest) {
    if (!username || !password)
      throw new CustomError(
        "Username/password incorrect!",
        401,
        "USERNAME_PASSWORD_INCORRECT_ERROR"
      );

    const user = await this.userRepository.findByUsername(username);

    if (!user)
      throw new CustomError(
        "Username/password incorrect!",
        401,
        "USERNAME_PASSWORD_INCORRECT_ERROR"
      );

    const comparePasswordHash = await this.passwordCrypto.compare(
      password,
      user.password
    );

    if (!comparePasswordHash)
      throw new CustomError(
        "Username/password incorrect!",
        401,
        "USERNAME_PASSWORD_INCORRECT_ERROR"
      );

    const tokenGenerate = this.token.create(user);

    const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || "";

    const refreshToken = sign({}, refreshTokenSecret, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
    });

    this.redisClient.setValue(user.id, refreshToken);

    return {
      token: tokenGenerate,
      refreshToken,
    };
  }
}
