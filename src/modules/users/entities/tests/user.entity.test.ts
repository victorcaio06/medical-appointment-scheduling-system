import { describe, test, expect } from "vitest";
import { User } from "../user.entity";

describe("User entity", () => {
  test("should be able to create a new user", async () => {
    const userMock = await User.create({
      name: "name_test",
      username: "username_test",
      password: "password_test",
    });

    expect(userMock).toBeInstanceOf(User);
    expect(userMock).toHaveProperty("id");
    expect(userMock.password).not.equal("password_test");
  });
});
