import dayjs from "dayjs";

import { CustomError } from "../../../../errors/custom.error";
import { formatDate, getDayOfWeek } from "../../../../utils/date";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

type FreeScheduleRequest = {
  doctorId: string;
  date: string;
};

type FreeTime = {
  time: string;
};

type FreeScheduleResponse = {
  doctorId: string;
  freeTime: FreeTime[];
};

export class FreeScheduleUseCase {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(data: FreeScheduleRequest): Promise<FreeScheduleResponse> {
    if (!data.doctorId)
      throw new CustomError("Doctor invalid!", 400, "DOCTOR_INVALID_ERROR");

    if (!data.date)
      throw new CustomError(
        "You need to select a date!",
        400,
        "DATE_INVALID_ERROR"
      );

    const dayOfWeek = getDayOfWeek(data.date);

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

    const appointmentsByDoctorAndDate =
      await this.appointmentRepository.findAllSchedulesByDoctorAndDate(
        data.doctorId,
        data.date
      );

    const startAt = doctorSchedule.startAt;
    const endAt = doctorSchedule.endAt;
    const duration = doctorSchedule.doctor.doctorInfo.duration;

    let timeNow = startAt;

    const freeTime: FreeTime[] = [];

    while (timeNow <= endAt) {
      const existsAppointment = appointmentsByDoctorAndDate.find(
        (appointment) => {
          const appointmentDateFormat = formatDate(appointment.date, "HH:mm ");
          return appointmentDateFormat === timeNow;
        }
      );

      if (!existsAppointment) {
        freeTime.push({
          time: timeNow,
        });
      }

      timeNow = dayjs(data.date + timeNow)
        .add(duration, "minute")
        .format("HH:mm");
    }

    return { doctorId: data.doctorId, freeTime: freeTime };
  }
}
