import { User } from "../../entities/user.entity";
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

  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
