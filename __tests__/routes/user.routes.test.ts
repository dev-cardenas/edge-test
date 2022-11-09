import request from "supertest";

import app from "../../src/app";
import { httpStatusCodes } from "../../src/constants/httpStatusCodes";
import { createDBIfNotExist } from "../../src/database/initDB";

const email = "test@example.com";
const password = "testpassword";

// this is not a good practice either, I know, but I didn't have much time
createDBIfNotExist();

async function createUser(emailLocal: string, passwordLocal: string) {
  return await request(app)
    .post("/api/v1/users")
    .send({
      email: emailLocal,
      password: passwordLocal,
    })
    .set("Accept", "application/json");
}

async function deleteUser(emailLocal: string) {
  return await request(app)
    .delete("/api/v1/users")
    .send({
      email: emailLocal,
    })
    .set("Accept", "application/json");
}

async function loginUser(emailLocal: string, passwordLocal: string) {
  return await request(app)
    .post("/api/v1/login")
    .send({
      email: emailLocal,
      password: passwordLocal,
    })
    .set("Accept", "application/json");
}

describe("User routes", () => {
  test("Created and delete user", async () => {
    const resPost = await createUser(email, password);
    expect(resPost.body).toEqual({
      status: httpStatusCodes.CREATED,
      message: "User created",
      success: true,
    });

    const res = await deleteUser(email);
    expect(res.body).toEqual({
      status: httpStatusCodes.CREATED,
      message: "User removed",
      success: true,
    });
  });

  test("Login user", async () => {
    await createUser(email, password);

    const res = await loginUser(email, password);

    expect(res.body.status).toEqual(httpStatusCodes.OK);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");

    await deleteUser(email);
  });
});
