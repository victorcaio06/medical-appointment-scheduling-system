import { Request, Response } from "express";

import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { FreeScheduleUseCase } from "./free-schedules.useCase";

export class FreeScheduleController {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const freeScheduleUseCase = new FreeScheduleUseCase(
      this.doctorScheduleRepository,
      this.appointmentRepository
    );

    try {
      const result = await freeScheduleUseCase.execute(body);
      return response.status(200).json(result);
    } catch (err: any) {
      return response
        .status(err.statusCode || 500)
        .json({ ERROR: err.message });
    }
  }
}
