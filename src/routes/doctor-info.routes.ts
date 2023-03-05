import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middlewares/ensure-authenticate.middleware";

import { createDoctorInfoController } from "../modules/doctor/useCases/createDoctorInfo";

const doctorInfoRouter = Router();

doctorInfoRouter.post(
  "/doctor-info",
  ensureAuthenticate,
  async (request, response) => {
    await createDoctorInfoController.handle(request, response);
  }
);

export { doctorInfoRouter };
