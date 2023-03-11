import { DoctorSchedule } from "../entities/doctor-schedule.entity";
import { DoctorSchedules as DoctorSchedulesPrisma } from "@prisma/client";

export class DoctorScheduleMapper {
  static entityToPrisma(data: DoctorSchedule): DoctorSchedulesPrisma[] {
    const doctorSchedulesPrisma: DoctorSchedulesPrisma[] = [];

    data.schedules.forEach((schedule) => {
      doctorSchedulesPrisma.push({
        day_of_week: schedule.dayOfWeek,
        start_at: schedule.startAt,
        end_at: schedule.endAt,
        doctor_id: data.doctorId,
        id: schedule.id ?? crypto.randomUUID(),
      });
    });

    return doctorSchedulesPrisma;
  }
}
