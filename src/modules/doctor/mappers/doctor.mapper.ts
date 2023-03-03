import { Doctor as DoctorPrisma } from "@prisma/client";

import { Doctor } from "../entities/doctor.entity";

export class DoctorMapper {
  static PrismaToEntityDoctor({
    id,
    crm,
    email,
    user_id,
    specialty_id,
  }: DoctorPrisma): Doctor {
    return {
      id,
      crm,
      email,
      userId: user_id,
      specialtyId: specialty_id,
    };
  }
}
