import { createPrismaInstance } from "@/lib/prisma";

import { app } from "./app";

const port = process.env.PORT || 8000;

const main = async () => {
  createPrismaInstance(process.env.DATABASE_URL!);
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`); // eslint-disable-line
  });
};

main();
