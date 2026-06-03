import express from "express";

const router = express.Router();

import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

import { authenticateToken } from "../middlewares/authenticateToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

import {
  validateArticleBody,
  validateArticleId,
} from "../validators/article.validator.js";
import validate from "../middlewares/validate.js";

router.get("/", getAllArticles);
router.get("/:id", validateArticleId, validate, getArticleById);
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["ADMIN"]),
  validateArticleBody,
  validate,
  createArticle,
);
router.put(
  "/:id",
  validateArticleId,
  validateArticleBody,
  validate,
  updateArticle,
);
router.delete("/:id", validateArticleId, validate, deleteArticle);

export default router;
