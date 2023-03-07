import { Router } from "express";
import { createPatientController } from "../modules/patients/useCases/createPatient";

const patientRouter = Router();

patientRouter.post("/patients", async (request, response) => {
  await createPatientController.handle(request, response);
});

export { patientRouter };
