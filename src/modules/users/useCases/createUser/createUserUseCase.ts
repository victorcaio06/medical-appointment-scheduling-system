import { User } from "../../entities/user.entity";
import { CustomError } from "../../../../errors/custom.error";
import { ParameterRequiredError } from "../../../../errors/parameter-required.error";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password.crypto";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async execute({ name, username, password }: UserRequest) {
    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists)
      throw new CustomError(
        "Username already exists!",
        409,
        "USERNAME_EXISTS_ERROR"
      );

    const user = User.create({ name, username, password });

    user.password = await this.passwordCrypto.hash(password);

    const userCreated = await this.userRepository.save(user);

    return userCreated;
  }
}
