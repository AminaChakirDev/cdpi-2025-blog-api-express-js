import { body, param } from "express-validator";

export const validateArticleBody = [
  body("title")
    .notEmpty()
    .withMessage("Le titre est requis")
    .isLength({ min: 3 })
    .withMessage("Le titre doit faire au moins 3 caractères")
    .isLength({ max: 30 })
    .withMessage("Le titre ne peut pas dépasser 30 caractères"),
  body("content")
    .notEmpty()
    .withMessage("Le contenu est requis")
    .isLength({ min: 10 })
    .withMessage("Le contenu doit faire au moins 10 caractères")
    .isLength({ max: 255 })
    .withMessage("Le contenu ne peut pas dépasser 255 caractères"),
];

export const validateArticleId = [
  param("id").isInt({ min: 1 }).withMessage("L'id doit être un entier positif"),
];
