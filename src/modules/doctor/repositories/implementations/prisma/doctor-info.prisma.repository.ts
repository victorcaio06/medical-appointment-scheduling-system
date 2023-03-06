import { prismaClient } from "../../../../../infra/database/prisma.config";
import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { DoctorInfoMapper } from "../../../mappers/doctor-info.mapper";
import { IDoctorInfoRepository } from "../../doctor-info.repository";

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
  async saveOrUpdate({
    startAt,
    endAt,
    duration,
    price,
    id,
    doctorId,
  }: DoctorInfo): Promise<DoctorInfo> {
    const doctorCreated = await prismaClient.doctorInfo.upsert({
      where: { doctor_id: doctorId },
      create: {
        start_at: startAt,
        end_at: endAt,
        duration,
        price,
        id,
        doctor_id: doctorId,
      },
      update: {
        start_at: startAt ?? undefined,
        end_at: endAt ?? undefined,
        duration: duration ?? undefined,
        price: price ?? undefined,
      },
    });

    return DoctorInfoMapper.prismaEntityDoctorInfo(doctorCreated);
  }
}
