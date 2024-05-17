import { Router } from "express";

import { ProductsService } from "./../services/products.js";
import validatorHandler from "./../middlewares/validator.js";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from "./../schemas/products.js";
export const productsRouter = Router();
const service = new ProductsService();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await service.get();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.getById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);
