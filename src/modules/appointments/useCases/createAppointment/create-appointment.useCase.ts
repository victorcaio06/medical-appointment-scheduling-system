import { CustomError } from "../../../../errors/custom.error";
import {
  dateToString,
  formatDateUTC,
  getDayOfWeek,
  toDate,
} from "../../../../utils/date";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IPatientRepository } from "../../../patients/repositories/patient.repository";
import { Appointment } from "../../entities/Appointment.entity";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export type CreateAppointmentRequest = {
  doctorId: string;
  date: Date;
};

export class CreateAppointmentUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(data: CreateAppointmentRequest, userId: string) {
    const patientExists = await this.patientRepository.findByUserId(userId);

    if (!patientExists) throw new CustomError("Patient does not exists!");

    const doctorExists = await this.doctorRepository.findById(data.doctorId);

    if (!doctorExists) throw new CustomError("Doctor does not exists!");

    const dayOfWeek = getDayOfWeek(dateToString(data.date));

    const doctorSchedule =
      await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
        data.doctorId,
        dayOfWeek
      );

    if (!doctorSchedule)
      throw new CustomError(
        "Doctor does not attend that day!",
        400,
        "DOCTOR_NOT_ATTEND_DAY_ERROR"
      );

    const dateFormat = formatDateUTC(data.date, "YYYY-MM-DD HH:mm");

    const existsAppointmentDoctor =
      await this.appointmentRepository.findAppointmentByDoctorAndDateTime(
        doctorExists.id,
        dateFormat
      );

    if (existsAppointmentDoctor)
      throw new CustomError(
        "There is already an appointment for this time!",
        409,
        "EXISTS_APPOINTMENT_DOCTOR_TIME_ERROR"
      );

    const existsAppointmentPatient =
      await this.appointmentRepository.findAppointmentByPatientAndDateTime(
        patientExists.id,
        dateFormat
      );

    if (existsAppointmentPatient)
      throw new CustomError(
        "There is already an appointment for this time!",
        409,
        "EXISTS_APPOINTMENT_DOCTOR_TIME_ERROR"
      );

    const appointment = Appointment.create({
      date: toDate(data.date),
      doctorId: data.doctorId,
      patientId: patientExists.id,
    });

    await this.appointmentRepository.save(appointment);

    return;
  }
}
