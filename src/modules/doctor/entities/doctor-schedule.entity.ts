import { randomUUID } from "crypto";

import { CustomError } from "../../../errors/custom.error";
import { compareEndStartTime, ValidateTime } from "../../../utils/date";

type DoctorScheduleProps = {
  doctorId: string;
  schedules: Schedules[];
};

type Schedules = {
  id?: string;
  startAt: string;
  endAt: string;
  dayOfWeek: number;
};

export class DoctorSchedule {
  doctorId: string;
  schedules: Schedules[];

  private constructor(props: DoctorScheduleProps) {
    if (!props.schedules)
      throw new CustomError(
        "Invalid schedules!",
        400,
        "INVALID_SCHEDULES_ERROR"
      );

    validateDuplicateSchedules(props.schedules);

    validateTimes(props.schedules);

    if (!props.doctorId)
      throw new CustomError(
        "Invalid doctor id",
        400,
        "DOCTOR_ID_NOT_FOUND_ERROR"
      );

    this.doctorId = props.doctorId;
    this.schedules = createSchedules(props.schedules);
  }

  static create(data: DoctorScheduleProps) {
    const doctorSchedule = new DoctorSchedule(data);

    return doctorSchedule;
  }
}

const validateDuplicateSchedules = (schedules: Schedules[]) => {
  const hasUniqueValue = new Set(schedules.map((value) => value.dayOfWeek));

  if (hasUniqueValue.size < schedules.length)
    throw new CustomError(
      "Duplicate day of week!",
      400,
      "DUPLICATE_DAY_WEEK_ERROR"
    );
};

const validateTimes = (schedules: Schedules[]) => {
  schedules.forEach((schedule) => {
    if (!ValidateTime(schedule.startAt))
      throw new CustomError("Invalid startAt!", 400, "INVALID_TIMES_ERROR");

    if (!ValidateTime(schedule.endAt))
      throw new CustomError("Invalid endAt!", 400, "INVALID_TIMES_ERROR");

    if (!compareEndStartTime(schedule.startAt, schedule.endAt))
      throw new CustomError(
        "End time cannot be earlier than start time!",
        400,
        "END_TIME_INVALID_ERROR"
      );
  });
};

const createSchedules = (schedules: Schedules[]) => {
  return schedules.map((schedule) => {
    return {
      ...schedule,
      id: randomUUID(),
    };
  });
};
