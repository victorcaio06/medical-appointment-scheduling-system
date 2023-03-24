import { EtherealMailProvider } from "../../../../infra/providers/mail/implementations/ethereal.mail.provider";
import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { DoctorPrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor.prisma.repository";
import { PatientPrismaRepository } from "../../../patients/repositories/implementations/prisma/patient.prisma.repository";
import { AppointmentPrismaRepository } from "../../repositories/prisma/appointment.prisma.repository";
import { CreateAppointmentController } from "./create-appointment.controller";

const patientPrismaRepository = new PatientPrismaRepository();
const doctorPrismaRepository = new DoctorPrismaRepository();
const doctorScheduleRepository = new DoctorSchedulePrismaRepository();
const appointmentPrismaRepository = new AppointmentPrismaRepository();
const etherealMailProvider = new EtherealMailProvider();

const createAppointmentController = new CreateAppointmentController(
  patientPrismaRepository,
  doctorPrismaRepository,
  doctorScheduleRepository,
  appointmentPrismaRepository,
  etherealMailProvider
);

export { createAppointmentController };
