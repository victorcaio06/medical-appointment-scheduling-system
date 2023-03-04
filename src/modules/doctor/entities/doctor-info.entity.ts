import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";
import { compareEndStartTime, ValidateTime } from "../../../utils/date";

export type DoctorInfoProps = {
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
  doctorId: string;
};

export class DoctorInfo {
  id: string;
  startAt: string;
  endAt: string;
  price: number;
  duration: number;
  doctorId: string;

  private constructor({
    startAt,
    endAt,
    price,
    duration,
    doctorId,
  }: DoctorInfoProps) {
    if (!doctorId)
      throw new CustomError(
        "Doctor does not exists!",
        404,
        "DOCTOR_NOT_EXISTS_ERROR"
      );

    if (duration <= 0)
      throw new CustomError("Invalid duration!", 400, "INVALID_DURATION_ERROR");

    if (!ValidateTime(startAt))
      throw new CustomError("Invalid startAt!", 400, "INVALID_TIMES_ERROR");

    if (!ValidateTime(endAt))
      throw new CustomError("Invalid endAt!", 400, "INVALID_TIMES_ERROR");

    if (!compareEndStartTime(startAt, endAt))
      throw new CustomError(
        "End time cannot be earlier than start time!",
        400,
        "END_TIME_INVALID_ERROR"
      );

    this.startAt = startAt;
    this.endAt = endAt;
    this.price = price;
    this.duration = duration;
    this.doctorId = doctorId;
    this.id = randomUUID();
  }

  static create({
    startAt,
    endAt,
    price,
    duration,
    doctorId,
  }: DoctorInfoProps) {
    const doctorInfo = new DoctorInfo({
      startAt,
      endAt,
      price,
      duration,
      doctorId,
    });

    return doctorInfo;
  }
}
