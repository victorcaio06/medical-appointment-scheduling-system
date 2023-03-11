import { DoctorSchedulePrismaRepository } from "../../repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/prisma/doctor.prisma.repository";
import { CreateDoctorScheduleController } from "./create-doctor-schedule.controller";
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule.useCase";

const doctorPrismaRepository = new DoctorPrismaRepository();

const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository();

const createDoctorScheduleController = new CreateDoctorScheduleController(
  doctorPrismaRepository,
  doctorSchedulePrismaRepository
);

export { createDoctorScheduleController };
