import pool from "../config/database.js";

export const resetDatabase = async () => {
  // Désactive temporairement les contraintes de clés étrangères.
  // Cela permet de vider les tables sans provoquer d'erreur
  // lorsqu'une table référence une autre.
  await pool.query("SET FOREIGN_KEY_CHECKS = 0");

  await pool.query("TRUNCATE TABLE article_user_like");
  await pool.query("TRUNCATE TABLE article");
  await pool.query("TRUNCATE TABLE user");
  await pool.query("TRUNCATE TABLE category");

  // Réactive les contraintes de clés étrangères afin que
  // l'intégrité des données soit à nouveau vérifiée.
  await pool.query("SET FOREIGN_KEY_CHECKS = 1");

  await pool.query(
    "INSERT INTO category (name) VALUES ('Technologie'), ('Lifestyle'), ('Voyage')",
  );

  await pool.query(`
  INSERT INTO user (firstname, lastname, email, password, role) VALUES
  ('Admin', 'Blog', 'admin@blog.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
  ('Jean', 'Dupont', 'jean@blog.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user')
`);

  await pool.query(`
  INSERT INTO article (title, content, category_id) VALUES
  ('Introduction à Node.js', "Node.js est un environnement d'exécution JavaScript", 1),
  ('Les meilleures destinations 2025', 'Découvrez les destinations incontournables...', 3),
  ('Bien manger au quotidien', 'Adopter une alimentation équilibrée...', 2)
`);

  await pool.query(`
  INSERT INTO article_user_like (user_id, article_id)
  VALUES (2, 1), (2, 3)
`);
};
