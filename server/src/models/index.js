import { Products, ProductsSchema } from "./products.js";

export function setupModels(sequelize) {
  Products.init(ProductsSchema, Products.config(sequelize));
}
