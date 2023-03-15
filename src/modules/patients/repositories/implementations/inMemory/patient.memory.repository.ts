import { Patient } from "../../../entities/patient.entity";
import { IPatientRepository } from "../../patient.repository";

export class PatientMemoryRepository implements IPatientRepository {
  patients: Patient[] = [];

  async save(data: Patient): Promise<Patient> {
    this.patients.push(data);

    return data;
  }

  findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Patient | null> {
    return this.patients.find((patient) => patient.id === id) || null;
  }

  async findByUserId(userId: string): Promise<Patient | null> {
    return this.patients.find((patient) => patient.userId === userId) || null;
  }
}
