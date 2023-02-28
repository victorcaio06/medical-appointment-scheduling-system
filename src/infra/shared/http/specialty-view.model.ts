import { Specialty } from "../../../modules/specialties/entities/specialty.entity";

export class SpecialtyViewModel {
  static toHttp(specialty: Specialty) {
    return {
      specialty: {
        name: specialty.name,
        description: specialty.description,
      },
    };
  }
}
