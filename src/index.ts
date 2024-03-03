// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { app } from "./app";
import { createPrismaInstance } from "./lib/prisma";

const port = process.env.PORT || 8000;

const main = async () => {
  createPrismaInstance(process.env.DATABASE_URL!);
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`); // eslint-disable-line
  });
};

main();
