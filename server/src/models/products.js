import { Model, DataTypes, Sequelize } from "sequelize";

const PRODUCTS_TABLE = "products";

export const ProductsSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export class Products extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      timestamps: false,
      modelName: "Products",
    };
  }
}
