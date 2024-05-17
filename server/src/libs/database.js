import { Sequelize } from "sequelize";
import { setupModels } from "../models/index.js";
export const db = new Sequelize(
  process.env.DB_NAME || "my_db",
  process.env.DB_USER || "admin",
  process.env.DB_PASSWORD || "admin123",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_TYPE || "sqlite",
    storage: process.env.DB_SQLITE_PATH || "Database/database.sqlite",
    logging: true,
  }
);

setupModels(db);
db.sync();
