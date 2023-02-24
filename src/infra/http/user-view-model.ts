import { User } from "../../entities/userEntity";

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
