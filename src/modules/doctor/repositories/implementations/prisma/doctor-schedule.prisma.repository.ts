import { prismaClient } from "../../../../../infra/database/prisma.config";
import { DoctorSchedule } from "../../../entities/doctor-schedule.entity";
import {
  DoctorScheduleMapper,
  DoctorScheduleWeek,
} from "../../../mappers/doctor-schedule.mapper";
import { IDoctorScheduleRepository } from "../../doctor-schedule.repository";

export class DoctorSchedulePrismaRepository
  implements IDoctorScheduleRepository
{
  async save(data: DoctorSchedule): Promise<void> {
    await prismaClient.$transaction([
      prismaClient.doctorSchedules.deleteMany({
        where: {
          doctor_id: data.doctorId,
        },
      }),
      prismaClient.doctorSchedules.createMany({
        data: DoctorScheduleMapper.entityToPrisma(data),
      }),
    ]);
  }

  async findByDoctorIdAndDayOfWeek(
    doctorId: string,
    dayOfWeek: number
  ): Promise<DoctorScheduleWeek | null> {
    const result = await prismaClient.doctorSchedules.findFirst({
      where: {
        AND: [{ day_of_week: dayOfWeek }, { doctor_id: doctorId }],
      },
      include: { doctor: { include: { doctorInfo: true } } },
    });

    if (result) return DoctorScheduleMapper.prismaToEntity(result);

    return null;
  }
}
