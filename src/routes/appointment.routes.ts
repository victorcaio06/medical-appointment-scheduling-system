import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middlewares/ensure-authenticate.middleware";
import { createAppointmentController } from "../modules/appointments/useCases/createAppointment";
import { freeScheduleController } from "../modules/appointments/useCases/freeSchedules";

const appointmentRoutes = Router();

appointmentRoutes.get(
  "/appointments/free-schedules",
  async (request, response) => {
    await freeScheduleController.handle(request, response);
  }
);

appointmentRoutes.post(
  "/appointments",
  ensureAuthenticate,
  async (request, response) => {
    await createAppointmentController.handle(request, response);
  }
);
export { appointmentRoutes };
