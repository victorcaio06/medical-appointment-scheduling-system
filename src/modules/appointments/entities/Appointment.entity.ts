import { randomUUID } from "crypto";

type AppointmentProps = {
  patientId: string;
  doctorId: string;
  date: Date;
};

export class Appointment {
  id?: string;
  patientId: string;
  doctorId: string;
  date: Date;
  note?: string;
  isFinished?: boolean;

  private constructor(props: AppointmentProps) {
    this.patientId = props.patientId;
    this.doctorId = props.doctorId;
    this.date = props.date;
    this.id = randomUUID();
  }

  static create(data: AppointmentProps) {
    const appointment = new Appointment(data);

    return appointment;
  }
}
