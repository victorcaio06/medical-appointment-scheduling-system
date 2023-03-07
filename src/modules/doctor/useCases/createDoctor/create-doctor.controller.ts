import { Request, Response } from "express";
import { z } from "zod";

import { ValidationSchemaError } from "../../../../errors/validation-schema.error";
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { ISpecialtyRepository } from "../../../specialties/repositories/specialty.repository";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorUseCase } from "./create-doctor.usecase";

export class CreateDoctorController {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialtyRepository: ISpecialtyRepository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const doctorSchema = z.object({
      username: z.string(),
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      crm: z.string().length(6),
      specialtyId: z.string().uuid(),
    });

    const createDoctorUseCase = new CreateDoctorUseCase(
      this.userRepository,
      this.doctorRepository,
      this.specialtyRepository
    );

    try {
      validatorSchema(doctorSchema, body);

      const doctorCreated = await createDoctorUseCase.execute(body);

      return response.status(201).json(doctorCreated);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json({ ERROR: error.erros });
      }
      return response.status(error.statusCode).json(error.message);
    }
  }
}
