import db from "../config/database.js";

const create = async (body) => {
  const sql =
    "INSERT INTO article_user_like (user_id, article_id) VALUES (?, ?)";
  const [result] = await db.query(sql, [body.userId, body.articleId]);
  return result.insertId;
};

const remove = async (body, callback) => {
  const sql = "DELETE FROM user WHERE user_id = ? AND article_id = ?";
  const [result] = await db.query(sql, [body.userId, body.articleId], callback);
};

export { create, remove };
