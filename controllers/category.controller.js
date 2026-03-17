const Category = require("../models/category.model");

const getAllCategories = (req, res) => {
  Category.findAll((error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }
    res.json(results);
  });
};

const getCategoryById = (req, res) => {
  const { id } = req.params;

  Category.findById(id, (error, results) => {
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

const createCategory = (req, res) => {
  const { name } = req.body;

  Category.create(name, (error, results) => {
    if (error) {
      console.error("❌ Erreur lors de la requête SQL:", error.message);
      return res.status(500).send("Erreur serveur");
    }

    res.status(201).json({ id: results.insertId, name });
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  Category.update(id, name, (error, results) => {
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

const deleteCategory = (req, res) => {
  const { id } = req.params;

  Category.remove(id, (error, results) => {
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
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
