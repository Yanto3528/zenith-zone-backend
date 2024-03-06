import request from "supertest";
import { ObjectId } from "bson";

import { app } from "@/app";

import { createTestAttribute } from "../helpers/db.helpers";

const path = "/api/v1/attributes";

describe("Attributes routes", () => {
  describe(`GET ${path}/:code`, () => {
    test("when passing in a existing code, it should return a attribute", async () => {
      const attribute = await createTestAttribute();
      const response = await request(app)
        .get(`${path}/${attribute.code}`)
        .expect(200);

      expect(response.body.data.id).toBe(attribute.id);
      expect(response.body.data.code).toBe(attribute.code);
    });

    test("when passing in a non-existing code, it should return null", async () => {
      await createTestAttribute();
      const response = await request(app)
        .get(`${path}/${new ObjectId()}`)
        .expect(200);

      expect(response.body.data).toBeNull();
    });
  });
});
