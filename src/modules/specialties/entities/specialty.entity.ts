import { CustomError } from "../../../errors/custom.error";

type ISpecialty = {
  name: string;
  description?: string;
};

export class Specialty {
  name: string;
  description?: string;

  private constructor({ name, description }: ISpecialty) {
    this.name = name;
    this.description = description;
  }

  static create({ name, description }: ISpecialty) {
    if (!name)
      throw new CustomError("Name is required!", 422, "NAME_REQUIRED_ERROR");

    const specialty = new Specialty({ name, description });

    return specialty;
  }
}
