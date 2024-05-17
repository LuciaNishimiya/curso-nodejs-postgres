import { db } from "../libs/database.js";
import boom from "@hapi/boom";
export class ProductsService {
  constructor() {
    this.Products = db.models.Products;
  }
  async create(data) {
    const result = await this.Products.create(data);
    return result;
  }

  async get() {
    const result = await this.Products.findAll();
    return result;
  }

  async getById(id) {
    const result = await this.Products.findByPk(id);
    if (!result) {
      throw boom.notFound("Product not found");
    }
    if (result.isBlock) {
      throw boom.conflict("Product is blocked");
    }

    return result;
  }

  async update(id, changes) {
    const product = await this.Products.findByPk(id); 
    if (!product) {
      throw boom.notFound("Product not found");
    }
    const result = await product.update(changes); 
    return result;
  }

  async delete(id) {
    const product = await this.Products.findByPk(id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    return await product.destroy().id;
  }
}
