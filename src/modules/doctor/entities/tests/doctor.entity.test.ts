import { test, expect, describe } from "vitest";
import { Doctor } from "../doctor.entity";

describe("Doctor entity", () => {
  test("should be able to create a new doctor", () => {
    const doctor = Doctor.create({
      crm: "123456",
      email: "doctor@gmail.com",
      specialtyId: "SPEC_ID",
      userId: "USER_ID",
    });

    expect(doctor).toBeInstanceOf(Doctor);
    expect(doctor).toHaveProperty("id");
  });

  test("should not be able to create a new docker with CRM invalid", () => {
    expect(() => {
      const doctor = Doctor.create({
        crm: "",
        email: "doctor@gmail.com",
        specialtyId: "SPEC_ID",
        userId: "USER_ID",
      });
    }).toThrow("CRM is required!");
  });

  test("should not be able to create a new docker with CRM length invalid", () => {
    expect(() => {
      const doctor = Doctor.create({
        crm: "12345",
        email: "doctor@gmail.com",
        specialtyId: "SPEC_ID",
        userId: "USER_ID",
      });
    }).toThrow("CRM is incorrect!");
  });

  test("should not be able to create a new docker with email invalid", () => {
    expect(() => {
      const doctor = Doctor.create({
        crm: "123456",
        email: "",
        specialtyId: "SPEC_ID",
        userId: "USER_ID",
      });
    }).toThrow("Email is required!");
  });
});
