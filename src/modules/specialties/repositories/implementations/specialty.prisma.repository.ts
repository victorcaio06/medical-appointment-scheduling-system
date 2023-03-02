import { prismaClient } from "../../../../infra/database/prisma.config";
import { Specialty } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";

export class SpecialtyPrismaRepository implements ISpecialtyRepository {
  async save(data: Specialty): Promise<Specialty> {
    const { name, description, id } = data;

    const specialtyCreated = await prismaClient.specialty.create({
      data: { name, description, id },
    });

    return specialtyCreated;
  }

  async findById(id: string): Promise<Specialty | null> {
    return await prismaClient.specialty.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Specialty | null> {
    return await prismaClient.specialty.findUnique({ where: { name } });
  }
}
