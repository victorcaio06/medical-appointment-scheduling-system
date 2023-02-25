import bcrypt from "bcryptjs";

import { IPasswordCrypto } from "./password.crypto";

export class PasswordBcrypt implements IPasswordCrypto {
  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }
}
