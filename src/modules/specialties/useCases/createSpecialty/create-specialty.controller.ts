import { Request, Response } from "express";
import { logger } from "../../../../utils/logger";
import { ISpecialtyRepository } from "../../repositories/specialty.repository";
import { CreateSpecialtyUseCase } from "./create-specialty.usecase";

export class CreateSpecialtyController {
  constructor(private specialtyRepository: ISpecialtyRepository) {}

  async handle(request: Request, response: Response) {
    const data = request.body;

    const createSpecialtyUseCase = new CreateSpecialtyUseCase(
      this.specialtyRepository
    );

    try {
      const result = await createSpecialtyUseCase.execute(data);

      return response.status(201).json(result);
    } catch (err: any) {
      logger.error(err.stack);

      return response.status(err.statusCode || 500).json({ ERROR: err.message });
    }
  }
}
