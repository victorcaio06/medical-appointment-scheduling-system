import { Patient as PatientPrisma } from "@prisma/client";
import { Patient } from "../entities/patient.entity";

export class PatientMapper {
  static EntityToPrisma(patient: Patient): PatientPrisma {
    return {
      ...patient,
      user_id: patient.userId,
    };
  }

  static PrismaToEntity(patient: PatientPrisma): Patient {
    return {
      ...patient,
      userId: patient.user_id,
    };
  }
}
