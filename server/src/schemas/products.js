import Joi from "joi";

const id = Joi.string().id();
const name = Joi.string().min(3).max(30);
const price = Joi.number().min(10);
const image = Joi.string().uri();
const description = Joi.string().max(200);
export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});
