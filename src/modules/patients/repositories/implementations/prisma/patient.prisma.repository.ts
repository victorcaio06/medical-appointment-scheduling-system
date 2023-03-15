import { prismaClient } from "../../../../../infra/database/prisma.config";
import { Patient } from "../../../entities/patient.entity";
import { PatientMapper } from "../../../mappers/patient.mapper";
import { IPatientRepository } from "../../patient.repository";

export class PatientPrismaRepository implements IPatientRepository {
  async save(data: Patient): Promise<Patient> {
    const patient = await prismaClient.patient.create({
      data: PatientMapper.EntityToPrisma(data),
    });

    return PatientMapper.PrismaToEntity(patient);
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await prismaClient.patient.findUnique({
      where: { id },
    });

    if (patient) return PatientMapper.PrismaToEntity(patient);

    return null;
  }

  async findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null> {
    const patient = await prismaClient.patient.findFirst({
      where: {
        OR: [{ document: { equals: document } }, { email: { equals: email } }],
      },
    });

    if (patient) return PatientMapper.PrismaToEntity(patient);

    return null;
  }

  async findByUserId(userId: string): Promise<Patient | null> {
    const patient = await prismaClient.patient.findUnique({
      where: { user_id: userId },
    });

    if (patient) return PatientMapper.PrismaToEntity(patient);

    return null;
  }
}
