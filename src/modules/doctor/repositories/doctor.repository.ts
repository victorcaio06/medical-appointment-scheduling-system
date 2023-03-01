import { Doctor } from "../entities/doctor.entity";

export interface IDoctorRepository {
  save(data: Doctor): Promise<Doctor>;
  findByCrm(crm: string): Promise<Doctor | null>;
}
