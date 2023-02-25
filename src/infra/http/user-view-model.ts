import { User } from "../../modules/users/entities/user.entity";

export class UserViewModel {
  static toHttp(user: User) {
    return {
      user: {
        name: user.name,
        username: user.username,
      },
    };
  }
}
