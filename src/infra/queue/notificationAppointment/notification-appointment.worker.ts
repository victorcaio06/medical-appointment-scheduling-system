import { formatDate } from "../../../utils/date";
import { EtherealMailProvider } from "../../providers/mail/implementations/ethereal.mail.provider";

export type NotificationTask = {
  email: string;
  date: Date;
};

const mailProvider = new EtherealMailProvider();

export async function notificationAppointmentWorker(
  data: NotificationTask
): Promise<void> {
  console.log("Enviando email para:", data.email);
  await mailProvider.sendEmail({
    to: data.email,
    from: "Agendamento de consulta <noreplay@agendaMedico.com.br>",
    html: `
      Olá! <br/>
      Gostaria de lembrar da sua consulta às ${formatDate(
        data.date,
        "HH:mm"
      )}.`,
    subject: "Lembrete de agendamento de consulta",
  });
}
