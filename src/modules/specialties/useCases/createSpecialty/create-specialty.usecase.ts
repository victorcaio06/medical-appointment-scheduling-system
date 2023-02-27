import { CustomError } from "../../../../errors/custom.error";
import { Specialty } from "../../entities/specialty.entity";
import { ISpecialtyRepository } from "../../repositories/specialty.repository";

type ISpecialty = {
  name: string;
  description?: string;
};

export class CreateSpecialtyUseCase {
  constructor(private specialtyRepository: ISpecialtyRepository) {}

  async execute({ name, description }: ISpecialty) {
    const specialty = Specialty.create({ name, description });

    const specialtyExists = await this.specialtyRepository.findByName(name);

    if (specialtyExists)
      throw new CustomError(
        "Specialty already exists!",
        409,
        "SPECIALTY_EXISTS_ERROR"
      );

    const specialtyCreated = await this.specialtyRepository.save(specialty);

    return specialtyCreated;
  }
}
