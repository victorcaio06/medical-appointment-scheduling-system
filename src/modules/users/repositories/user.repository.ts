import { User } from "../entities/user.entity";

export interface IUserRepository {
  save(data: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | undefined>;
}
