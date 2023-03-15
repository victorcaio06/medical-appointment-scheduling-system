import { describe, test, expect } from "vitest";
import { randomUUID } from "crypto";

import { CreateAppointmentUseCase } from "../create-appointment.useCase";
import { PatientMemoryRepository } from "../../../../patients/repositories/implementations/inMemory/patient.memory.repository";
import { DoctorMemoryRepository } from "../../../../doctor/repositories/implementations/inMemory/doctor.memory.repository";

describe("Create Appointment", () => {
  test("should not be able to create an appointment without a patient or with an invalid patient", async () => {
    const patientInMemoryRepository = new PatientMemoryRepository();
    const doctorInMemoryRepository = new DoctorMemoryRepository();
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository
    );

    expect(async () => {
      await createAppointmentUseCase.execute(
        {
          doctorId: randomUUID(),
          date: new Date(),
        },
        "ID_USER_INVALID", 
      );
    }).rejects.toThrow("Patient does not exists!");
  });

  test("should not be able to create an appointment without a doctor or with an invalid doctor", async () => {
    const patientInMemoryRepository = new PatientMemoryRepository();
    const doctorInMemoryRepository = new DoctorMemoryRepository();
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository
    );

    const patient = await patientInMemoryRepository.save({
      document: "DOCUMENT_PATIENT",
      email: "patient@email.com.br",
      id: randomUUID(),
      userId: randomUUID(),
    });

    expect(async () => {
      await createAppointmentUseCase.execute(
        {
          doctorId: randomUUID(),
          date: new Date(),
        },
        patient.userId
      );
    }).rejects.toThrow("Doctor does not exists!");
  });
});
