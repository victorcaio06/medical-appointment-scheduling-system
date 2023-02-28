import { User } from "../entities/user.entity";
import { UserViewModel } from "../../../infra/shared/http/user-view-model";

export interface IUserRepository {
  save(data: User): Promise<UserViewModel>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | undefined>;
}
