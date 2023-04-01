import { appointmentNotificationQueue } from "../../../../infra/queue/notificationAppointment/notification-appointment.queue";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export class CreateNotificationAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute() {
    const appointments =
      await this.appointmentRepository.findAllTodayIncludePatients();

    appointments.forEach(async (appointment) => {
      const emailPatient = appointment.patient.email;
      const date = appointment.date;

      await appointmentNotificationQueue.push({
        email: emailPatient,
        date,
      });
    });

    return appointments;
  }
}
