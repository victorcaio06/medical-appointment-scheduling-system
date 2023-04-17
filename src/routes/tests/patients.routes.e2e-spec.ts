import request from "supertest";
import { describe, it } from "vitest";
import { app } from "../../app";

describe("Patients", () => {
  it("should be able to create a new patient", () => {
    request(app).post("/patients");
  });
});
