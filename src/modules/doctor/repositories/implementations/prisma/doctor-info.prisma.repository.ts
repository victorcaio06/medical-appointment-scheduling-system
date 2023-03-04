import { prismaClient } from "../../../../../infra/database/prisma.config";
import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { DoctorInfoMapper } from "../../../mappers/doctor-info.mapper";
import { IDoctorInfoRepository } from "../../doctor-info.repository";

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
  async save({
    startAt,
    endAt,
    duration,
    price,
    id,
    doctorId,
  }: DoctorInfo): Promise<DoctorInfo> {
    const doctorCreated = await prismaClient.doctorInfo.create({
      data: {
        start_at: startAt,
        end_at: endAt,
        duration,
        price,
        id,
        doctor_id: doctorId,
      },
    });

    return DoctorInfoMapper.prismaEntityDoctorInfo(doctorCreated);
  }
}
