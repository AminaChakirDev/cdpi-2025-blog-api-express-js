-- =============================================
-- Initialisation de la base de données du blog
-- Exécuté automatiquement au premier démarrage
-- du conteneur MySQL (docker-entrypoint-initdb.d)
-- =============================================

-- ---------- Création des tables ----------

CREATE TABLE category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
);

CREATE TABLE article (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE article_user_like (
  user_id INT NOT NULL,
  article_id INT NOT NULL,
  PRIMARY KEY (user_id, article_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE
);

-- ---------- Données de test ----------

INSERT INTO category (name)
VALUES ('Technologie'), ('Lifestyle'), ('Voyage');

-- Mot de passe en clair : "password"
INSERT INTO user (firstname, lastname, email, password, role) VALUES
  ('Admin', 'Blog', 'admin@blog.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
  ('Jean', 'Dupont', 'jean@blog.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');

INSERT INTO article (title, content, category_id) VALUES
  ('Introduction à Node.js', 'Node.js est un environnement d''exécution JavaScript', 1),
  ('Les meilleures destinations 2025', 'Découvrez les destinations incontournables...', 3),
  ('Bien manger au quotidien', 'Adopter une alimentation équilibrée...', 2);

INSERT INTO article_user_like (user_id, article_id)
VALUES (2, 1), (2, 3);