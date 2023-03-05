import { Router } from "express";

import { doctorInfoRouter } from "./doctor-info.routes";
import { doctorRouter } from "./doctor.routes";
import { specialtyRouter } from "./specialty.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use(userRouter);
router.use(specialtyRouter);
router.use(doctorRouter);
router.use(doctorInfoRouter);

export { router };
