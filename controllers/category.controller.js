import * as Category from "../models/category.model.js";
import * as categoryService from "../services/category.service.js"

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAll();
  res.json(categories);
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    return res.json(category);
  } catch (error) {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategoryId = await Category.create(name);
    return res.status(201).json({ id: newCategoryId });
  } catch (error) {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Category.update(id, name);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.json({ id: parseInt(id, 10) });
  } catch (error) {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.remove(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("❌ Erreur lors de la requête SQL:", error.message);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
