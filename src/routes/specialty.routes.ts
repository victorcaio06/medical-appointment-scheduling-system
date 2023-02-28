import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middlewares/ensure-authenticate.middleware";
import { createSpecialtyController } from "../modules/specialties/useCases/createSpecialty";

const specialtyRouter = Router();

specialtyRouter.post(
  "/specialties",
  ensureAuthenticate,
  async (request, response) => {
    await createSpecialtyController.handle(request, response);
  }
);

export { specialtyRouter };
