import { User } from "../entities/userEntity";

export class UserRepository {
  users: User[];

  private static instance: UserRepository;

  constructor() {
    this.users = [];
  }

  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }

  async save(data: User) {
    this.users.push(data);

    return data;
  }

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
