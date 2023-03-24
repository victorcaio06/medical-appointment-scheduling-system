import { Request, Response } from "express";

import { IMailProvider } from "../../../../infra/providers/mail/mail.provider";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IPatientRepository } from "../../../patients/repositories/patient.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { CreateAppointmentUseCase } from "./create-appointment.useCase";

export class CreateAppointmentController {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { body, userId } = request;

    const createAppointmentUseCase = new CreateAppointmentUseCase(
      this.patientRepository,
      this.doctorRepository,
      this.doctorScheduleRepository,
      this.appointmentRepository,
      this.mailProvider
    );

    try {
      const createdAppointment = await createAppointmentUseCase.execute(
        body,
        userId
      );

      return response.status(200).json(createdAppointment);
    } catch (err: any) {
      return response
        .status(err.statusCode || 500)
        .json({ ERROR: err.message });
    }
  }
}
