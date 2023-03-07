import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";

export type PatientProps = {
  email: string;
  document: string;
  userId: string;
};

export class Patient {
  id: string;
  email: string;
  document: string;
  userId: string;

  private constructor({ userId, email, document }: PatientProps) {
    if (!email)
      throw new CustomError("Email invalid!", 400, "EMAIL_INVALID_ERROR");

    if (!document)
      throw new CustomError("Document invalid!", 400, "DOCUMENT_INVALID_ERROR");

    this.userId = userId;
    this.email = email;
    this.document = document;
    this.id = randomUUID();
  }

  static create(data: PatientProps) {
    const patient = new Patient(data);

    return patient;
  }
}
