import { Appointment } from "../entities/Appointment.entity";

export type AppointmentsDate = {
  date: Date;
};

export type AppointmentsWithPatients = {
  date: Date;
  patient: {
    email: string;
  };
};

export interface IAppointmentRepository {
  save(data: Appointment): Promise<void>;

  findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]>;

  findAppointmentByDoctorAndDateTime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null>;

  findAppointmentByPatientAndDateTime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate | null>;

  findAllTodayIncludePatients(): Promise<AppointmentsWithPatients[]>;
}
