import { User } from "../../entities/userEntity";
import { UserRepository } from "../../repositories/userRepository";

type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  async execute({ name, username, password }: UserRequest) {
    const userRepository = UserRepository.getInstance();

    if (!name || !username || !password)
      throw new Error("Campos obrigatórios faltando!");

    const usernameExists = await userRepository.findByUsername(username);

    if (usernameExists) throw new Error("Username already exists!");

    const user = User.create({ name, username, password });

    const userCreated = await userRepository.save(user);

    return userCreated;
  }
}
