import { Request, Response } from "express";

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

    const createPatientUseCase = new CreatePatientUseCase(
      this.userRepository,
      this.patientRepository
    );

    try {
      const result = await createPatientUseCase.execute(body);

      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(error.statusCode).json({ ERROR: error.message });
    }
  }
}
