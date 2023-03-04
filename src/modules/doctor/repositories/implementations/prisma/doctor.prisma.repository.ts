import { prismaClient } from "../../../../../infra/database/prisma.config";

import { Doctor } from "../../../entities/doctor.entity";
import { DoctorMapper } from "../../../mappers/doctor.mapper";
import { IDoctorRepository } from "../../doctor.repository";

export class DoctorPrismaRepository implements IDoctorRepository {
  async save({ id, crm, email, userId, specialtyId }: Doctor): Promise<Doctor> {
    const doctor = await prismaClient.doctor.create({
      data: {
        id,
        crm,
        email,
        user_id: userId,
        specialty_id: specialtyId,
      },
    });

    return DoctorMapper.PrismaToEntityDoctor(doctor);
  }

  findById(id: string): Promise<Doctor | null> {
    throw new Error("Method not implemented.");
  }

  async findByCrm(crm: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: { crm },
    });

    if (doctor) return DoctorMapper.PrismaToEntityDoctor(doctor);

    return null;
  }

  findByUserId(userId: string): Promise<Doctor | null> {
    throw new Error("Method not implemented.");
  }
}
