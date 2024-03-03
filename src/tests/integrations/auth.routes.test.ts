import request from "supertest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";

import { createTestUser } from "../helpers/db.helpers";

const getTokenFromCookie = (headers: request.Response["headers"]) => {
  const cookie = headers["set-cookie"][0];
  const token = cookie.split(";")[0].split("=")[1];

  return token;
};

describe("Auth routes", () => {
  describe("POST /api/v1/auth/signup", () => {
    test("when passing in the correct data, it should return created user with correct email", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test@example.com",
          password: "password",
        })
        .expect(201);

      const token = getTokenFromCookie(response.headers);
      const signupUser = await prisma.user.findUnique({
        where: { email: "test@example.com" },
      });

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token");
      expect(token).toBeTruthy();
      expect(signupUser!.email).toBe("test@example.com");
    });

    test("when passing in the wrong email format, it should return 400 error", async () => {
      await request(app)
        .post("/api/v1/auth/signup")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test.com",
          password: "password",
        })
        .expect(400);
    });

    test("when passing in the wrong password format, it should return 400 error", async () => {
      await request(app)
        .post("/api/v1/auth/signup")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test@example.com",
          password: "123",
        })
        .expect(400);
    });

    test("when passing in the wrong name format, it should return 400 error", async () => {
      await request(app)
        .post("/api/v1/auth/signup")
        .send({
          firstName: true,
          lastName: true,
          email: "test@example.com",
          password: "123",
        })
        .expect(400);
    });

    test("when passing in email that already exists, it should return 400 error", async () => {
      const anotherUser = await createTestUser();
      await request(app)
        .post("/api/v1/auth/signup")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: anotherUser.email,
          password: "123456",
        })
        .expect(400);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    test("when passing in the correct credentials, it should login the user", async () => {
      const { email } = await createTestUser();

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({ email, password: "password" })
        .expect(200);

      const token = getTokenFromCookie(response.headers);
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token");
      expect(token).toBeTruthy();
    });

    test("when passing in the wrong email, it should return 400 error", async () => {
      await createTestUser();

      await request(app)
        .post("/api/v1/auth/login")
        .send({ email: "some-random@example.com", password: "password" })
        .expect(400);
    });

    test("when passing in the wrong password, it should return 400 error", async () => {
      const { email } = await createTestUser();

      await request(app)
        .post("/api/v1/auth/login")
        .send({ email, password: "some-random-password" })
        .expect(400);
    });
  });

  describe("DELETE /api/v1/auth/logout", () => {
    test("when calling the api, it should logout the logged in user", async () => {
      const { id } = await createTestUser();

      const response = await request(app)
        .delete("/api/v1/auth/logout")
        .set("Cookie", global.signin(id))
        .expect(200);

      const cookie = response.headers["set-cookie"][0];
      const token = cookie.split(";")[0].split("=")[1];

      expect(token).toBe("");
    });
  });
});
