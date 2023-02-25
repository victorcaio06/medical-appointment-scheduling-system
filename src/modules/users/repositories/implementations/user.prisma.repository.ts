import { prismaClient } from "../../../../infra/database/prisma.config";

import { User } from "../../entities/user.entity";
import { UserViewModel } from "../../../../infra/http/user-view-model";
import { IUserRepository } from "../user.repository";

export class UserPrismaRepository implements IUserRepository {
  async save(data: User): Promise<UserViewModel> {
    const { name, username, password } = data;

    const userCreated = await prismaClient.user.create({
      data: { name, username, password },
      select: { name: true, username: true },
    });
    return userCreated;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return (
      (await prismaClient.user.findUnique({ where: { username } })) || undefined
    );
  }
}
