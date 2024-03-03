import { MongoMemoryReplSet } from "mongodb-memory-server";

export const createMemoryMongoDbServer = async () => {
  const replSet = await MongoMemoryReplSet.create({
    replSet: { count: 1 },
    instanceOpts: [
      {
        storageEngine: "wiredTiger",
      },
    ],
  });
  await replSet.waitUntilRunning();

  const dbName = "test";
  const uri = replSet.getUri();
  const uriSplits = uri.split("?");
  const uriWithDb = uriSplits[0] + dbName + `?${uriSplits[1]}`;

  const stopServer = async () => {
    return replSet.stop();
  };

  return { stopServer, dbUrl: uriWithDb };
};

export const createTestPrismaClient = async () => {
  const { stopServer, dbUrl } = await createMemoryMongoDbServer();

  return { stopServer, dbUrl };
};
