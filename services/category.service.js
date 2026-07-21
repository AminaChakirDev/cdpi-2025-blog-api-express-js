import * as CategoryModel from "../models/category.model.js";

export const getAll = async () => {
  const categories = await CategoryModel.findAll();
  console.log("youhou");
  return categories;
};
