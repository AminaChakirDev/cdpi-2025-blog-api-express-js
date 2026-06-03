import db from "../config/database.js";
import AppError from "../errors/AppError.js";

const findAll = async () => {
  const sql = "SELECT * FROM article";
  const [rows] = await db.query(sql);
  return rows;
};

const findById = async (id) => {
  const sql = "SELECT * FROM article WHERE id = ?";
  const [rows] = await db.query(sql, [id]);
  if (rows.length === 0) {
    throw new AppError("Article introuvable", 404);
  }

  return rows[0];
};

const create = async (article) => {
  const sql =
    "INSERT INTO article (title, content, category_id) VALUES (?, ?, ?)";
  const [result] = await db.query(sql, [
    article.title,
    article.content,
    article.categoryId,
  ]);
  return result.insertId;
};

const update = async (id, article) => {
  const sql =
    "UPDATE article SET title = ?, content = ?, category_id = ?  WHERE id = ?";
  const [result] = await db.query(sql, [
    article.title,
    article.content,
    article.categoryId,
    id,
  ]);
  return result;
};

const remove = async (id) => {
  const sql = "DELETE FROM article WHERE id = ?";
  const [result] = await db.query(sql, [id]);
  return result;
};

export { findAll, findById, create, update, remove };
