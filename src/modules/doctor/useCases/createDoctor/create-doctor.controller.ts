import { Request, Response } from "express";
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
    const data = request.body;

    const createDoctorUseCase = new CreateDoctorUseCase(
      this.userRepository,
      this.doctorRepository,
      this.specialtyRepository
    );

    try {
      const doctorCreated = await createDoctorUseCase.execute(data);

      return response.status(201).json(doctorCreated);
    } catch (err: any) {
      return response
        .status(err.statusCode || 500)
        .json({ ERROR: err.message });
    }
  }
}
