import { describe, expect, test, beforeAll } from "vitest";

import { Specialty } from "../../../../specialties/entities/specialty.entity";
import { SpecialtyMemoryRepository } from "../../../../specialties/repositories/implementations/specialty.memory.repository";
import { ISpecialtyRepository } from "../../../../specialties/repositories/specialty.repository";
import { UserMemoryRepository } from "../../../../users/repositories/implementations/user.memory.repository";
import { DoctorMemoryRepository } from "../../../repositories/implementations/inMemory/doctor.memory.repository";
import {
  CreateDoctorRequest,
  CreateDoctorUseCase,
} from "../create-doctor.usecase";

let specialtyRepository: ISpecialtyRepository;
let specialtyMock: Specialty;

beforeAll(async () => {
  specialtyRepository = new SpecialtyMemoryRepository();

  specialtyMock = Specialty.create({
    name: "name_test",
    description: "description_test",
  });

  await specialtyRepository.save(specialtyMock);
});

describe("Create Doctor Use Case", () => {
  test("should be able to create a new doctor", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      email: "email_test@gmail.com",
      password: "teste!234",
      crm: "123456",
      specialtyId: specialtyMock.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialtyRepository
    );

    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty("id");
  });

  test("should not be able to create a new doctor with exists CRM", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      username: "username_test_test",
      name: "name_test",
      email: "email_test@gmail.com",
      password: "teste!234",
      crm: "123456",
      specialtyId: specialtyMock.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialtyRepository
    );

    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      const doctorMockExistsCRM: CreateDoctorRequest = {
        username: "username_test",
        name: "name_test",
        email: "email_test_test@gmail.com",
        password: "teste!234",
        crm: "123456",
        specialtyId: specialtyMock.id,
      };

      await createDoctorUseCase.execute(doctorMockExistsCRM);
    }).rejects.toThrow("CRM already exits!");
  });

  test("should not be able to create a new doctor with CRM length invalid", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      username: "username_test_test",
      name: "name_test",
      email: "email_test@gmail.com",
      password: "teste!234",
      crm: "12345",
      specialtyId: specialtyMock.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialtyRepository
    );

    expect(async () => {
      await createDoctorUseCase.execute(doctorMock);
    }).rejects.toThrow("CRM is incorrect!");
  });
});
