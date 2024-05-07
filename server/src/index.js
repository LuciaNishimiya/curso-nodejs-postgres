import express, { json } from "express";
import cors from "cors";
import routerApi from "./routes/index.js";

import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from "./middlewares/error.js";
import { docs } from "./docs/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

const options = {
  origin: process.env.CORS_ORIGIN || "*",
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.send(docs);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
