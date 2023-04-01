import { IMailProvider } from "../../../../infra/providers/mail/mail.provider";
import { formatDate } from "../../../../utils/date";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute() {
    const appointments =
      await this.appointmentRepository.findAllTodayIncludePatients();

    appointments.forEach(async (appointment) => {
      const emailPatient = appointment.patient.email;
      const date = appointment.date;

      await this.mailProvider.sendEmail({
        to: emailPatient,
        from: "Agendamento de consulta <noreplay@agendaMedico.com.br>",
        html: `
          Olá! <br/>
          Gostaria de lembrar da sua consulta às ${formatDate(date, "HH:mm")}.`,
        subject: "Lembrete de agendamento de consulta",
      });
    });

    return appointments;
  }
}
