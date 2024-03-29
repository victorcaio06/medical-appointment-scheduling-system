import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../errors/parameter-required.error";
import { PasswordBcrypt } from "../../../infra/shared/crypto/password.bcrypt";

type IUser = {
  name: string;
  username: string;
  password: string;
  avatar?: string | null;
};

export class User {
  id: string;
  isAdmin?: boolean;
  name: string;
  username: string;
  password: string;
  avatar?: string | null;

  private constructor({ name, username, password, avatar }: IUser) {
    if (!name || !username || !password)
      throw new ParameterRequiredError(
        "Name/username/password is required!",
        422
      );

    this.name = name;
    this.username = username;
    this.password = password;
    this.isAdmin = false;
    this.id = randomUUID();
    this.avatar = avatar;
  }

  static async create({
    name,
    username,
    password,
    avatar,
  }: IUser): Promise<User> {
    if (!password)
      throw new ParameterRequiredError("Password is required!", 422);

    const bcrypt = new PasswordBcrypt();
    const passwordHashed = await bcrypt.hash(password);

    password = passwordHashed;

    const user = new User({ name, username, password, avatar });

    return user;
  }
}
