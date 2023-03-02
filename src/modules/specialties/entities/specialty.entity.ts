import { randomUUID } from "crypto";

import { CustomError } from "../../../errors/custom.error";

type ISpecialty = {
  name: string;
  description?: string;
};

export class Specialty {
  id: string;
  name: string;
  description?: string | null;

  private constructor({ name, description }: ISpecialty) {
    this.name = name;
    this.description = description;
    this.id = randomUUID();
  }

  static create({ name, description }: ISpecialty) {
    if (!name)
      throw new CustomError("Name is required!", 422, "NAME_REQUIRED_ERROR");

    const specialty = new Specialty({ name, description });

    return specialty;
  }
}
