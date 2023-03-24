import { Doctor as DoctorPrisma, User as UserPrisma } from "@prisma/client";
import { DoctorWithUserDTO } from "../dto/doctor.dto";

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

  static PrismaToEntityDoctorIncludeUser(
    doctor: DoctorPrisma & { user: UserPrisma }
  ): DoctorWithUserDTO {
    return {
      id: doctor.id,
      crm: doctor.crm,
      email: doctor.email,
      userId: doctor.user_id,
      specialtyId: doctor.specialty_id,
      user: {
        name: doctor.user.name,
      },
    };
  }
}
