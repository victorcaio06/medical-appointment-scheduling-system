import { Router } from "express";
import multer from "multer";

import { createPatientController } from "../modules/patients/useCases/createPatient";
import uploadConfigMulter from "../config/upload.config";

const patientRouter = Router();

const uploadFile = multer(uploadConfigMulter);

patientRouter.post("/patients", uploadFile.single("avatar"), async (request, response) => {
  await createPatientController.handle(request, response);
});

export { patientRouter };
