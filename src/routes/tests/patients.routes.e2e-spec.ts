import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../app";

describe("Patients", () => {
  it("should be able to create a new patient", async () => {
    const result = await request(app).post("/patients").send({
      username: "username_supertest",
      name: "name_supertest",
      password: "user_password",
      email: "user_email@gmail.com",
      document: "document_supertest",
    });

    console.log({ result: result.body });

    expect(result.body).toHaveProperty("id");
    expect(result.statusCode).eq(201);
  });
});
