import request from "supertest";
import { User } from "@prisma/client";

import { app } from "@/app";

import { createTestAttribute, createTestUser } from "../helpers/db.helpers";

const path = "/api/v1/admin/attributes";

describe("Attributes admin routes", () => {
  let user: User;
  beforeEach(async () => {
    user = await createTestUser("ADMIN");
  });

  describe(`GET ${path}`, () => {
    test("it should return a list of attributes", async () => {
      await createTestAttribute();
      await createTestAttribute();
      await createTestAttribute();
      const response = await request(app)
        .get(path)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(3);
    });
  });

  describe(`GET ${path}/:id`, () => {
    test("when passing in a correct id, it should return a attribute", async () => {
      const attribute = await createTestAttribute();
      const response = await request(app)
        .get(`${path}/${attribute.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data).toEqual(attribute);
    });

    test("when passing in a non-existent id, it should return null", async () => {
      const attribute = await createTestAttribute();
      const response = await request(app)
        .get(`${path}/${attribute.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data).toEqual(attribute);
    });
  });
});
