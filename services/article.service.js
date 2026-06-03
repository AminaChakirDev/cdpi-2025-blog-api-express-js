import * as ArticleModel from "../models/article.model.js";

export const getAll = async () => {
  const articles = await ArticleModel.findAll();
  return articles;
};
