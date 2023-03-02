import { SpecialtyViewModel } from "../../../../infra/shared/http/specialty-view.model";
import { Specialty } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../specialty.repository";

export class SpecialtyMemoryRepository implements ISpecialtyRepository {
  specialties: Specialty[];

  private static instante: SpecialtyMemoryRepository;

  constructor() {
    this.specialties = [];
  }

  static getInstance() {
    if (!SpecialtyMemoryRepository.instante)
      SpecialtyMemoryRepository.instante = new SpecialtyMemoryRepository();

    return SpecialtyMemoryRepository.instante;
  }

  async save(data: Specialty): Promise<Specialty> {
    this.specialties.push(data);

    return data;
  }
  async findById(id: string): Promise<Specialty | null> {
    return this.specialties.find((specialty) => specialty.id === id) || null;
  }

  async findByName(name: string): Promise<Specialty | null> {
    return (
      this.specialties.find((specialty) => specialty.name === name) || null
    );
  }
}
