import { DoctorInfo as DoctorInfoPrisma } from "@prisma/client";
import { DoctorInfo } from "../entities/doctor-info.entity";

export class DoctorInfoMapper {
  static prismaEntityDoctorInfo({
    id,
    start_at,
    end_at,
    duration,
    price,
    doctor_id,
  }: DoctorInfoPrisma): DoctorInfo {
    return {
      id,
      startAt: start_at,
      endAt: end_at,
      duration,
      price: Number(price),
      doctorId: doctor_id,
    };
  }
}
