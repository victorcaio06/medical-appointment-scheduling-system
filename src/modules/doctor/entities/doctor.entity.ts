import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";

export type DoctorProps = {
  crm: string;
  email: string;
  userId: string;
  specialtyId: string;
};

export class Doctor {
  id: string;
  crm: string;
  email: string;
  userId: string;
  specialtyId: string;

  private constructor({ crm, email, specialtyId, userId }: DoctorProps) {
    if (!crm)
      throw new CustomError("CRM is required!", 422, "CRM_REQUIRED_ERROR");

    if (crm.length !== 6)
      throw new CustomError("CRM is incorrect!", 422, "CRM_INCORRECT_ERROR");

    if (!email)
      throw new CustomError("Email is required!", 422, "EMAIL_REQUIRED_ERROR");

    this.id = randomUUID();
    this.crm = crm;
    this.email = email;
    this.userId = userId;
    this.specialtyId = specialtyId;
  }

  static create(props: DoctorProps) {
    const doctor = new Doctor(props);

    return doctor;
  }
}
