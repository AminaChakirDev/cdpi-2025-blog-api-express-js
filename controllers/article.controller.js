const Article = require("../models/article.model");

const getAllArticles = (req, res) => {
  Article.findAll((error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }
    res.json(results);
  });
};

const getArticleById = (req, res) => {
  const { id } = req.params;

  Article.findById(id, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    if (results.length === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }

    res.json(results[0]);
  });
};

const createArticle = (req, res) => {
  const article = req.body;

  Article.create(article, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    res.status(201).json({ id: results.insertId, article });
  });
};

const updateArticle = (req, res) => {
  const { id } = req.params;
  const article = req.body;

  Article.update(id, article, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }

    res.json({ id: parseInt(id, 10), name });
  });
};

const deleteArticle = (req, res) => {
  const { id } = req.params;

  Article.remove(id, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }

    res.status(204).send();
  });
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
