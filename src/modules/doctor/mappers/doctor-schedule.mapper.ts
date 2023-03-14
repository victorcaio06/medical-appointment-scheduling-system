import { DoctorSchedule } from "../entities/doctor-schedule.entity";
import {
  DoctorSchedules as DoctorSchedulesPrisma,
  Doctor,
  DoctorInfo,
} from "@prisma/client";

export type DoctorScheduleWeek = {
  startAt: string;
  endAt: string;
  dayOfWeek: number;
  doctorId: string;
  doctor: {
    doctorInfo: {
      duration: number;
    };
  };
};

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

  static prismaToEntity(
    schedule: DoctorSchedulesPrisma & {
      doctor: Doctor & { doctorInfo: DoctorInfo | null };
    }
  ): DoctorScheduleWeek {
    return {
      dayOfWeek: schedule.day_of_week,
      startAt: schedule.start_at,
      endAt: schedule.end_at,
      doctorId: schedule.doctor_id,
      doctor: {
        doctorInfo: {
          duration: schedule.doctor.doctorInfo?.duration || 0,
        },
      },
    };
  }
}
