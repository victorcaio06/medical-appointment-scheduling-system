import { DoctorInfoPrismaRepository } from "../../repositories/implementations/prisma/doctor-info.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/prisma/doctor.prisma.repository";
import { CreateDoctorInfoController } from "./create-doctor-info.controller";

const doctorPrismaRepository = new DoctorPrismaRepository();
const doctorInfoPrismaRepository = new DoctorInfoPrismaRepository();

const createDoctorInfoController = new CreateDoctorInfoController(
  doctorPrismaRepository,
  doctorInfoPrismaRepository
);

export { createDoctorInfoController };
