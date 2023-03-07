import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { PatientPrismaRepository } from "../../repositories/implementations/prisma/patient.prisma.repository";
import { CreatePatientController } from "./create-patient.controller";

const userPrismaRepository = new UserPrismaRepository();
const patientPrismaRepository = new PatientPrismaRepository();

const createPatientController = new CreatePatientController(
  userPrismaRepository,
  patientPrismaRepository
);

export { createPatientController };
