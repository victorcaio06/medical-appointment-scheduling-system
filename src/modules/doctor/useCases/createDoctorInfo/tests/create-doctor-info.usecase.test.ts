import { describe, test, expect } from "vitest";
import dayjs from "dayjs";
import { randomUUID } from "crypto";

import {
  CreateDoctorInfoUseCase,
  DoctorInfoRequest,
} from "../create-doctor-info.usecase";
import { DoctorMemoryRepository } from "../../../repositories/implementations/inMemory/doctor.memory.repository";
import { DoctorInfoMemoryRepository } from "../../../repositories/implementations/inMemory/doctor-info.memory.repository";

describe("Create doctor info", () => {
  test("should not be able to create a doctor info if doctor does not exists", () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const doctorInfoRequest: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(
        doctorInfoRequest,
        "INVALID_USER_ID"
      );
    }).rejects.toThrow("Doctor does not exists!");
  });

  test("should not be able to create a doctor info if endAt is before startAt", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = randomUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@gmail.com",
      id: randomUUID(),
      specialtyId: randomUUID(),
      userId,
    });

    const doctorInfoRequest: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoRequest, userId);
    }).rejects.toThrow("End time cannot be earlier than start time!");
  });

  test("should not be able to create a doctor info if endAt is invalid", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = randomUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@gmail.com",
      id: randomUUID(),
      specialtyId: randomUUID(),
      userId,
    });

    const doctorInfoRequest: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      endAt: "99:99",
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoRequest, userId);
    }).rejects.toThrow("Invalid endAt!");
  });

  test("should not be able to create a doctor info if startAt is invalid", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = randomUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@gmail.com",
      id: randomUUID(),
      specialtyId: randomUUID(),
      userId,
    });

    const doctorInfoRequest: DoctorInfoRequest = {
      startAt: "99:99",
      endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoRequest, userId);
    }).rejects.toThrow("Invalid startAt!");
  });

  test("should be able to create a new doctor info", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = randomUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@gmail.com",
      id: randomUUID(),
      specialtyId: randomUUID(),
      userId,
    });

    const doctorInfoRequest: DoctorInfoRequest = {
      startAt: "10:00",
      endAt: "18:00",
      price: 150,
      duration: 10,
    };

    const doctorCreated = await createDoctorInfoUseCase.execute(
      doctorInfoRequest,
      userId
    );

    expect(doctorCreated).toHaveProperty("id");
  });
});
