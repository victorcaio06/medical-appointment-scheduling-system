import { Request, Response } from "express";
import { IDoctorScheduleRepository } from "../../repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule.useCase";

export class CreateDoctorScheduleController {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { body, userId } = request;

    const createDoctorScheduleUseCase = new CreateDoctorScheduleUseCase(
      this.doctorRepository,
      this.doctorScheduleRepository
    );

    try {
      await createDoctorScheduleUseCase.execute(body, userId);

      return response.status(204).end();
    } catch (err: any) {
      return response
        .status(err.statusCode || 500)
        .json({ ERROR: err.message });
    }
  }
}
