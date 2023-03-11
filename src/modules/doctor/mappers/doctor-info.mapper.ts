import { DoctorInfo as DoctorInfoPrisma } from "@prisma/client";
import { DoctorInfo } from "../entities/doctor-info.entity";

export class DoctorInfoMapper {
  static prismaEntityDoctorInfo({
    id,
    duration,
    price,
    doctor_id,
  }: DoctorInfoPrisma): DoctorInfo {
    return {
      id,
      duration,
      price: Number(price),
      doctorId: doctor_id,
    };
  }
}
