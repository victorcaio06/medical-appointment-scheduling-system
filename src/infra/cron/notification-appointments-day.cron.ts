import cron from "node-cron";

import { AppointmentPrismaRepository } from "../../modules/appointments/repositories/prisma/appointment.prisma.repository";
import { CreateNotificationAppointmentUseCase } from "../../modules/appointments/useCases/createNotificationAppointment/create-notification-appointment.useCase";

console.log("entrou aqui no cron");

cron.schedule("0 0 0 * * *", async () => {
  console.log("Schedule is running!");

  const appointmentPrismaRepository = new AppointmentPrismaRepository();

  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(appointmentPrismaRepository);
  await createNotificationAppointmentUseCase.execute();
});
