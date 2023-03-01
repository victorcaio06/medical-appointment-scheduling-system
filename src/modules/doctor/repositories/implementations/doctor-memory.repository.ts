import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../doctor.repository";

export class DoctorMemoryRepository implements IDoctorRepository {
  doctors: Doctor[];

  private static instance: DoctorMemoryRepository;

  constructor() {
    this.doctors = [];
  }

  static getInstance() {
    if (!DoctorMemoryRepository.instance)
      DoctorMemoryRepository.instance = new DoctorMemoryRepository();

    return DoctorMemoryRepository.instance;
  }

  async save(data: Doctor): Promise<Doctor> {
    this.doctors.push(data);

    return data;
  }

  async findByCrm(crm: string): Promise<Doctor | null> {
    return this.doctors.find((doctor) => doctor.crm === crm) || null;
  }
}
