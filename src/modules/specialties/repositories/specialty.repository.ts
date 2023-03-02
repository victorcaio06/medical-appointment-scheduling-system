import { Specialty } from "../entities/specialty.entity";

export interface ISpecialtyRepository {
  save(data: Specialty): Promise<Specialty>;
  findById(id: string): Promise<Specialty | null>;
  findByName(name: string): Promise<Specialty | null>;
}
