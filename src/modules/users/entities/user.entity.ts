import { randomUUID } from "crypto";
import { ParameterRequiredError } from "../../../errors/parameter-required.error";

type IUser = {
  name: string;
  username: string;
  password: string;
};

export class User {
  id: string;
  isAdmin?: boolean;
  name: string;
  username: string;
  password: string;

  private constructor({ name, username, password }: IUser) {
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
  }

  static create({ name, username, password }: IUser): User {
    const user = new User({ name, username, password });

    return user;
  }
}
