import { randomUUID } from "crypto";

type IUser = {
  name: string;
  username: string;
  password: string;
};

export class User {
  private _id: string;
  private _isAdmin: boolean;

  name: string;
  username: string;
  password: string;

  private constructor({ name, username, password }: IUser) {
    this.name = name;
    this.username = username;
    this.password = password;
    this._id = randomUUID();
    this._isAdmin = false;
  }

  static create({ name, username, password }: IUser) {
    const user = new User({ name, username, password });
    
    return user;
  }

  get id() {
    return this._id;
  }

  get isAdmin() {
    return this._isAdmin;
  }
}
