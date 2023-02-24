import { User } from "../../../entities/userEntity";
import { UserViewModel } from "../../../infra/http/user-view-model";

export interface IUserRepository {
  save(data: User): Promise<UserViewModel>;
  findByUsername(username: string): Promise<User | undefined>;
}
