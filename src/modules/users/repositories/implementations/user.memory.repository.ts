import { User } from "../../../../entities/userEntity";
import { IUserRepository } from "../user.repository";

export class UserMemoryRepository implements IUserRepository {
  users: User[];

  private static instance: UserMemoryRepository;

  constructor() {
    this.users = [];
  }

  static getInstance() {
    if (!UserMemoryRepository.instance) {
      UserMemoryRepository.instance = new UserMemoryRepository();
    }

    return UserMemoryRepository.instance;
  }

  async save(data: User): Promise<User> {
    this.users.push(data);

    return data;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
