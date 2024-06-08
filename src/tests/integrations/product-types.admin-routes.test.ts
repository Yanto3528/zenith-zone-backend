import request from "supertest";
import { User } from "@prisma/client";

import { app } from "@/app";

import { createTestProductType, createTestUser } from "../helpers/db.helpers";

const path = "/api/v1/admin/product-types";

describe("Product types admin routes", () => {
  let user: User;
  beforeEach(async () => {
    user = await createTestUser("ADMIN");
  });

  describe(`GET ${path}`, () => {
    test("it should return a list of product types", async () => {
      await createTestProductType();
      await createTestProductType();
      await createTestProductType();
      const response = await request(app)
        .get(path)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(3);
    });
  });

  describe(`GET ${path}/:id`, () => {
    test("when passing in a correct id, it should return a product type", async () => {
      const productType = await createTestProductType();
      const response = await request(app)
        .get(`${path}/${productType.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data).toEqual(productType);
    });

    test("when passing in a non-existent id, it should return null", async () => {
      const productType = await createTestProductType();
      const response = await request(app)
        .get(`${path}/${productType.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data).toEqual(productType);
    });
  });
});
