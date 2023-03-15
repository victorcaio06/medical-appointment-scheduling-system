import { prismaClient } from "../../../../infra/database/prisma.config";
import { Appointment } from "../../entities/Appointment.entity";
import {
  AppointmentsDate,
  IAppointmentRepository,
} from "../appointment.repository";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]> {
    return await prismaClient.$queryRaw`SELECT ap.date FROM appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date} and doctor_id = ${doctorId}`;
  }

  async findAppointmentByDoctorAndDateTime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] =
      await prismaClient.$queryRaw`SELECT ap.date FROM appointments ap where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} and doctor_id = ${doctorId} limit 1`;

    return result[0];
  }

  async findAppointmentByPatientAndDateTime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] =
      await prismaClient.$queryRaw`SELECT ap.date FROM appointments ap where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} and patient_id = ${patientId}`;

    return result[0];
  }

  async save(data: Appointment): Promise<void> {
    await prismaClient.appointment.create({
      data: {
        date: data.date,
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        id: data.id,
      },
    });
  }
}
