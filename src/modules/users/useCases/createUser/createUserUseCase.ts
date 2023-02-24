import { User } from "../../../../entities/userEntity";
import { CustomError } from "../../../../errors/custom.error";
import { ParameterRequiredError } from "../../../../errors/parameter-required.error";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, username, password }: UserRequest) {
    if (!name || !username || !password)
      throw new ParameterRequiredError("Username/password is required!", 422);

    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists)
      throw new CustomError(
        "Username already exists!",
        409,
        "USERNAME_EXISTS_ERROR"
      );

    const user = User.create({ name, username, password });

    const userCreated = await this.userRepository.save(user);

    return userCreated;
  }
}
