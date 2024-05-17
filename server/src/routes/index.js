import { Router } from "express";

import usersRouter from "./users.js";
import { productsRouter } from "./products.js";

function routerApi(app) {
  const router = Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/products", productsRouter);
}

export default routerApi;
