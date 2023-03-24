import { prismaClient } from "../../../../../infra/database/prisma.config";
import { DoctorWithUserDTO } from "../../../dto/doctor.dto";

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

  async findById(id: string): Promise<DoctorWithUserDTO | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        id: id,
      },
      include: { user: true },
    });

    if (doctor) return DoctorMapper.PrismaToEntityDoctorIncludeUser(doctor);

    return null;
  }

  async findByCrm(crm: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: { crm },
    });

    if (doctor) return DoctorMapper.PrismaToEntityDoctor(doctor);

    return null;
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: { user_id: userId },
    });

    if (doctor) return DoctorMapper.PrismaToEntityDoctor(doctor);

    return null;
  }
}
