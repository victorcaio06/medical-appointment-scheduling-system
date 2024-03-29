import { Router } from "express";
import { appointmentRoutes } from "./appointment.routes";

import { doctorInfoRouter } from "./doctor-info.routes";
import { doctorScheduleRouter } from "./doctor-schedule.routes";
import { doctorRouter } from "./doctor.routes";
import { patientRouter } from "./patient.routes";
import { specialtyRouter } from "./specialty.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use(userRouter);
router.use(specialtyRouter);
router.use(doctorRouter);
router.use(doctorInfoRouter);
router.use(patientRouter);
router.use(doctorScheduleRouter);
router.use(appointmentRoutes);

export { router };
