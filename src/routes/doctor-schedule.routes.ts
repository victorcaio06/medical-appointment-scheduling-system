import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middlewares/ensure-authenticate.middleware";
import { createDoctorScheduleController } from "../modules/doctor/useCases/createDoctorSchedule";

const doctorScheduleRouter = Router();

doctorScheduleRouter.post(
  "/doctor-schedules",
  ensureAuthenticate,
  async (request, response) => {
    await createDoctorScheduleController.handle(request, response);
  }
);

export { doctorScheduleRouter };
