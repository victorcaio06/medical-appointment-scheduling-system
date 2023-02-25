import { User } from "../entities/user.entity";
import { UserViewModel } from "../../../infra/http/user-view-model";

export interface IUserRepository {
  save(data: User): Promise<UserViewModel>;
  findByUsername(username: string): Promise<User | undefined>;
}
