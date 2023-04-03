import { Request, Response } from "express";
import { z } from "zod";
import { ValidationSchemaError } from "../../../../errors/validation-schema.error";
import { validatorSchema } from "../../../../infra/shared/validator/zod";

import { IUserRepository } from "../../../users/repositories/user.repository";
import { IPatientRepository } from "../../repositories/patient.repository";
import { CreatePatientUseCase } from "./create-patient.usecase";

export class CreatePatientController {
  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRepository
  ) {}
  async handle(request: Request, response: Response) {
    const { body } = request;
    const avatar = request.file?.filename;

    const patientSchema = z.object({
      name: z.string(),
      username: z.string(),
      password: z.string(),
      email: z.string().email(),
      document: z.string().min(5),
    });

    const createPatientUseCase = new CreatePatientUseCase(
      this.userRepository,
      this.patientRepository
    );

    try {
      validatorSchema(patientSchema, body);

      const result = await createPatientUseCase.execute(body, avatar);

      return response.status(201).json(result);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json({
          ERROR: error.erros,
        });
      }
      return response
        .status(error.statusCode || 500)
        .json({ ERROR: error.message });
    }
  }
}
