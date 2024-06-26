import request from "supertest";
import { User } from "@prisma/client";
import { ObjectId } from "bson";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";

import { createTestAddress, createTestUser } from "../helpers/db.helpers";

const path = "/api/v1/addresses";

describe("Adresses routes", () => {
  let user: User;
  beforeEach(async () => {
    user = await createTestUser();
  });

  describe(`GET ${path}`, () => {
    test("it should return a list of addresses that is owned by currently logged in user", async () => {
      await createTestAddress(user.id);
      await createTestAddress(user.id);

      const response = await request(app)
        .get(path)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(2);
    });

    test("when user is not logged in, it should return 401 error", async () => {
      await createTestAddress(user.id);
      await request(app).get(path).expect(401);
    });
  });

  describe(`GET ${path}/:id`, () => {
    test("when currently logged in user is the owner of the address, it should return the address", async () => {
      const address = await createTestAddress(user.id);

      const response = await request(app)
        .get(`${path}/${address.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.id).toBe(address.id);
    });

    test("when attempting to fetch a address that does not exist, it should return 404 error", async () => {
      await request(app)
        .get(`${path}/${new ObjectId()}`)
        .set("Cookie", global.signin(user.id))
        .expect(404);
    });

    test("when currently logged in user is not the owner of the address, it should return 403 error", async () => {
      const anotherUser = await createTestUser();
      const address = await createTestAddress(anotherUser.id);

      await request(app)
        .get(`${path}/${address.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(403);
    });

    test("when user is not logged in, it should return 401 error", async () => {
      const address = await createTestAddress(user.id);
      await request(app).get(`${path}/${address.id}`).expect(401);
    });
  });

  describe(`POST ${path}`, () => {
    test("when passing in the correct data, it should create a new address", async () => {
      const response = await request(app)
        .post(path)
        .send({
          firstName: "John",
          lastName: "doe",
          streetAddress: "123 Main Street",
          streetAddress2: "",
          city: "New York",
          country: "USA",
          postalCode: "40001",
        })
        .set("Cookie", global.signin(user.id))
        .expect(201);

      expect(response.body.data.streetAddress).toBe("123 Main Street");
      expect(response.body.data.city).toBe("New York");
      expect(response.body.data.country).toBe("USA");
      expect(response.body.data.postalCode).toBe("40001");
      expect(response.body.data.isDefault).toBe(false);
      expect(response.body.data.firstName).toBe("John");
      expect(response.body.data.lastName).toBe("doe");
      expect(response.body.data.id).toBeTruthy();
    });

    test("when passing the wrong data, it should returns 400 error", async () => {
      const response = await request(app)
        .post(path)
        .send({})
        .set("Cookie", global.signin(user.id))
        .expect(400);

      expect(response.body.errors.length).toBe(6);
    });

    test("when not authenticated, it should returns 401 error", async () => {
      await request(app).post(path).send({}).expect(401);
    });
  });

  describe(`PUT ${path}`, () => {
    test("when passing in the correct data, it should update address", async () => {
      const address = await createTestAddress(user.id);
      const response = await request(app)
        .put(`${path}/${address.id}`)
        .send({
          firstName: "William",
          lastName: address.lastName,
          streetAddress: address.streetAddress,
          streetAddress2: address.streetAddress2,
          city: address.city,
          country: address.country,
          postalCode: address.postalCode,
          isDefault: address.isDefault,
        })
        .set("Cookie", global.signin(user.id))
        .expect(200);

      const expectedResult = {
        ...address,
        firstName: "William",
      };

      expect(response.body.data).toEqual(expectedResult);
    });

    test("when updating a address to be default address, it should update the address as default and remove default property on other address", async () => {
      await createTestAddress(user.id, true);
      const address2 = await createTestAddress(user.id);
      await createTestAddress(user.id);

      const beforeAddresses = await prisma.address.findMany({
        where: { userId: user.id },
      });
      expect(beforeAddresses[0].isDefault).toBe(true);
      expect(beforeAddresses[1].isDefault).toBe(false);
      expect(beforeAddresses[2].isDefault).toBe(false);

      const response = await request(app)
        .put(`${path}/${address2.id}`)
        .send({
          firstName: address2.firstName,
          lastName: address2.lastName,
          streetAddress: address2.streetAddress,
          streetAddress2: address2.streetAddress2,
          city: address2.city,
          country: address2.country,
          postalCode: address2.postalCode,
          isDefault: true,
        })
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.id).toBe(address2.id);
      expect(response.body.data.isDefault).toBe(true);

      const addresses = await prisma.address.findMany({
        where: { userId: user.id },
      });
      expect(addresses.length).toBe(3);
      expect(addresses[0].isDefault).toBe(false);
      expect(addresses[1].isDefault).toBe(true);
      expect(addresses[2].isDefault).toBe(false);
    });

    test("when not authenticated, it should returns 401 error", async () => {
      await request(app).post(path).send({}).expect(401);
    });

    test("when attempting to update address that does not belong to current user, it should return 401 error", async () => {
      const anotherUser = await createTestUser();
      const address = await createTestAddress(user.id);
      await request(app)
        .put(`${path}/${address.id}`)
        .send({})
        .set("Cookie", global.signin(anotherUser.id))
        .expect(401);
    });

    test("when attempting to update address that does not exist, it should return 404 error", async () => {
      await request(app)
        .put(`${path}/${new ObjectId()}`)
        .send({})
        .set("Cookie", global.signin(user.id))
        .expect(404);
    });
  });

  describe(`DELETE ${path}`, () => {
    test("when passing in existing address id, it should deletes the record", async () => {
      const address = await createTestAddress(user.id);
      const addressExist = await prisma.address.findFirst({
        where: { id: address.id },
      });
      expect(addressExist).toBeDefined();
      await request(app)
        .delete(`${path}/${address.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      const deletedAddress = await prisma.address.findFirst({
        where: { id: address.id },
      });
      expect(deletedAddress).toBeNull();
    });

    test("when passing in the wrong address id, it should returns 404 error", async () => {
      await createTestAddress(user.id);
      await request(app)
        .delete(`${path}/${new ObjectId()}`)
        .set("Cookie", global.signin(user.id))
        .expect(404);
    });

    test("when attempting to delete another user address, it should return 401 error", async () => {
      const anotherUser = await createTestUser();
      const address = await createTestAddress(anotherUser.id);
      await request(app)
        .delete(`${path}/${address.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(401);
    });

    test("when attempting to delete address without login, it should return 401 error", async () => {
      const address = await createTestAddress(user.id);
      await request(app).delete(`${path}/${address.id}`).expect(401);
    });
  });
});
