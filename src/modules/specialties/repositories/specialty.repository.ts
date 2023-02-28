import { SpecialtyViewModel } from "../../../infra/shared/http/specialty-view.model";
import { Specialty } from "../entities/specialty.entity";

export interface ISpecialtyRepository {
  save(data: Specialty): Promise<SpecialtyViewModel>;
  findByName(name: string): Promise<SpecialtyViewModel | undefined>;
}
