import { Sequelize } from "sequelize";
import { setupModels } from "../models/index.js";
import "dotenv/config";
export const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_TYPE || "sqlite",
    storage: process.env.DB_SQLITE_PATH || "Database/database.sqlite",
    logging: true,
  }
);

setupModels(db);
db.sync({ alter: true });
