import { pool } from "../libs/postgresql/pool.js";
import boom from "@hapi/boom";
export class ProductsService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err.message));
  }
  async create(data) {
    const { name, price, description, image } = data;
    const query = `
      INSERT INTO products (name, price, description , image)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const rta = await this.pool.query(query, [name, price, description, image]);
    const newProduct = rta.rows[0];
    return newProduct;
  }

  async get() {
    const query = "SELECT * FROM products";
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async getById(id) {
    const query = "SELECT * FROM products WHERE id = $1";
    const rta = await this.pool.query(query, [id]);
    const product = rta.rows[0];

    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is blocked");
    }

    return product;
  }

  async update(id, changes) {
    const query = `
      UPDATE products
      SET 
        name = $1,
        price = $2,
        description = $3
      WHERE id = $4
      RETURNING *
    `;

    const { name, price, description } = changes;
    const rta = await this.pool.query(query, [name, price, description, id]);
    const updatedProduct = rta.rows[0];

    if (!updatedProduct) {
      throw boom.notFound("Product not found");
    }

    return updatedProduct;
  }

  async delete(id) {
    const query = "DELETE FROM products WHERE id = $1";
    const rta = await this.pool.query(query, [id]);

    if (rta.rowCount === 0) {
      throw boom.notFound("Product not found");
    }

    return { id };
  }
}
