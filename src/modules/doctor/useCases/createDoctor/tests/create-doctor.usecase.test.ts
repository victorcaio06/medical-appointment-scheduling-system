import { randomUUID } from "crypto";
import { describe, expect, test } from "vitest";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository";
import { DoctorMemoryRepository } from "../../../repositories/implementations/doctor-memory.repository";

import {
  CreateDoctorRequest,
  CreateDoctorUseCase,
} from "../create-doctor.usecase";

describe("Create Doctor Use Case", () => {
  test("should be able to create a new doctor", async () => {
    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      email: "email_test@gmail.com",
      password: "teste!234",
      crm: "123456",
      specialtyId: randomUUID(),
    };

    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository
    );

    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty("id");
  });
});
