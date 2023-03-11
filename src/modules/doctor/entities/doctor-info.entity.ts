import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";

type DoctorInfoProps = {
  price: number;
  duration: number;
  doctorId: string;
};

export class DoctorInfo {
  id: string;
  price: number;
  duration: number;
  doctorId: string;

  private constructor({ price, duration, doctorId }: DoctorInfoProps) {
    if (!doctorId)
      throw new CustomError(
        "Doctor does not exists!",
        404,
        "DOCTOR_NOT_EXISTS_ERROR"
      );

    if (duration <= 0)
      throw new CustomError("Invalid duration!", 400, "INVALID_DURATION_ERROR");

    this.price = price;
    this.duration = duration;
    this.doctorId = doctorId;
    this.id = randomUUID();
  }

  static create({ price, duration, doctorId }: DoctorInfoProps) {
    const doctorInfo = new DoctorInfo({
      price,
      duration,
      doctorId,
    });

    return doctorInfo;
  }
}
