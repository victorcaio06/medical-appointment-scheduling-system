import { DoctorWithUserDTO } from "../dto/doctor.dto";
import { Doctor } from "../entities/doctor.entity";

export interface IDoctorRepository {
  save(data: Doctor): Promise<Doctor>;
  findByCrm(crm: string): Promise<Doctor | null>;
  findById(id: string): Promise<DoctorWithUserDTO | null>;
  findByUserId(userId: string): Promise<Doctor | null>;
}
