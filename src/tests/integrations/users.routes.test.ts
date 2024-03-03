import request from "supertest";
import { User } from "@prisma/client";

import { app } from "@/app";

import { createTestUser } from "../helpers/db.helpers";

const path = "/api/v1/users";

describe("User routes", () => {
  let user: User;
  beforeEach(async () => {
    user = await createTestUser("ADMIN");
  });

  describe(`GET ${path}`, () => {
    test("when logged in user is admin, it should return a list of users", async () => {
      await createTestUser();
      await createTestUser();

      const response = await request(app)
        .get(path)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(3);
    });

    test("when logged in user is normal user, it should returns 403 error", async () => {
      const normalUser = await createTestUser();

      await request(app)
        .get(path)
        .set("Cookie", global.signin(normalUser.id))
        .expect(403);
    });

    test("when attempting to fetch list of users without login, it should returns 401 error", async () => {
      await request(app).get(path).expect(401);
    });
  });

  describe(`GET ${path}/:id`, () => {
    test("when logged in user is admin, it should return a user", async () => {
      const anotherUser = await createTestUser();

      const response = await request(app)
        .get(`${path}/${anotherUser.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.id).toEqual(anotherUser.id);
    });

    test("when logged in user is normal user, it should returns 403 error", async () => {
      const normalUser = await createTestUser();

      await request(app)
        .get(`${path}/${normalUser.id}`)
        .set("Cookie", global.signin(normalUser.id))
        .expect(403);
    });

    test("when attempting to fetch user details without login, it should returns 401 error", async () => {
      await request(app).get(`${path}/${user.id}`).expect(401);
    });
  });
});
