import { SpecialtyPrismaRepository } from "../../repositories/implementations/specialty.prisma.repository";
import { CreateSpecialtyController } from "./create-specialty.controller";

const specialtyPrismaRepository = new SpecialtyPrismaRepository();

const createSpecialtyController = new CreateSpecialtyController(
  specialtyPrismaRepository
);

export { createSpecialtyController };
