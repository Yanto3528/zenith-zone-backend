import { app } from "./app";

const port = process.env.PORT || 8000;

const main = async () => {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`); // eslint-disable-line
  });
};

main();
