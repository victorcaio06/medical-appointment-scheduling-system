import cron from "node-cron";
import { AppointmentPrismaRepository } from "../../modules/appointments/repositories/prisma/appointment.prisma.repository";
import { CreateNotificationAppointmentUseCase } from "../../modules/appointments/useCases/createNotificationAppointment/create-notification-appointment.useCase";
import { EtherealMailProvider } from "../providers/mail/implementations/ethereal.mail.provider";

console.log("entrou aqui no cron");

cron.schedule("*/20 * * * * *", async () => {
  console.log("Schedule is running!");

  const appointmentPrismaRepository = new AppointmentPrismaRepository();
  const mailProvider = new EtherealMailProvider();

  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(
      appointmentPrismaRepository,
      mailProvider
    );
  await createNotificationAppointmentUseCase.execute();
});
