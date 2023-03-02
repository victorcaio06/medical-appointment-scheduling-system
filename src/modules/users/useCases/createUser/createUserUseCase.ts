import { CustomError } from "../../../../errors/custom.error";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, username, password }: UserRequest) {
    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists)
      throw new CustomError(
        "Username already exists!",
        409,
        "USERNAME_EXISTS_ERROR"
      );

    const user = await User.create({ name, username, password });

    const userCreated = await this.userRepository.save(user);

    return userCreated;
  }
}
