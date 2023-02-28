import { prismaClient } from "../../../../infra/database/prisma.config";

import { User } from "../../entities/user.entity";
import { UserViewModel } from "../../../../infra/shared/http/user-view-model";
import { IUserRepository } from "../user.repository";

export class UserPrismaRepository implements IUserRepository {
  async save(data: User): Promise<UserViewModel> {
    const { name, username, password, id, isAdmin } = data;

    const userCreated = await prismaClient.user.create({
      data: { name, username, password, id, isAdmin },
      select: { name: true, username: true },
    });
    return userCreated;
  }

  async findById(id: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return (
      (await prismaClient.user.findUnique({ where: { username } })) || undefined
    );
  }
}
