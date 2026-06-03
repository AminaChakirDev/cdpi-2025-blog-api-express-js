import * as Article from "../models/article.model.js";
import * as ArticleService from "../services/article.service.js";

const getAllArticles = async (req, res) => {
  const articles = await ArticleService.getAll();
  res.json(articles);
};

const getArticleById = async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id);
  res.json(article);
};

const createArticle = async (req, res) => {
  const newArticle = req.body;

  const newArticleId = await Article.create(newArticle);
  res.status(201).json(newArticle);
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const article = req.body;
  const result = await Article.update(id, article);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.json({ message: "Article updated" });
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const result = await Article.remove(id);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.status(204).send();
};

export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
