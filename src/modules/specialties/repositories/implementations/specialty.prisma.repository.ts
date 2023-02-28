import { prismaClient } from "../../../../infra/database/prisma.config";
import { SpecialtyViewModel } from "../../../../infra/shared/http/specialty-view.model";
import { Specialty } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";

export class SpecialtyPrismaRepository implements ISpecialtyRepository {
  async save(data: Specialty): Promise<SpecialtyViewModel> {
    const { name, description } = data;

    const specialtyCreated = await prismaClient.specialty.create({
      data: { name, description },
      select: { name: true, description: true },
    });

    return specialtyCreated;
  }

  async findByName(name: string): Promise<SpecialtyViewModel | undefined> {
    return (
      (await prismaClient.specialty.findUnique({
        where: { name },
      })) || undefined
    );
  }
}
