import { Patient as PatientPrisma } from "@prisma/client";
import { Patient } from "../entities/patient.entity";

export class PatientMapper {
  static EntityToPrisma(patient: Patient): PatientPrisma {
    return {
      user_id: patient.userId,
      id: patient.id,
      document: patient.document,
      email: patient.email,
    };
  }

  static PrismaToEntity(patient: PatientPrisma): Patient {
    return {
      id: patient.id,
      userId: patient.user_id,
      document: patient.document,
      email: patient.email,
    };
  }
}
