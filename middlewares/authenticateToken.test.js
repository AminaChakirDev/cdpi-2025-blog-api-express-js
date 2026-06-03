import { describe, it, expect, vi } from "vitest";
import { authenticateToken } from "./authenticateToken.js";
import jwt from "jsonwebtoken";

// On définit le secret JWT directement
process.env.JWT_SECRET = "secret_test";

describe("authenticateToken", () => {
  const mockRes = () => {
    // mockRes simule l'objet res
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };
  // status et json sont des fonctions mockées avec vi.fn()
  // mockReturnValue(res) permet d'écrire res.status(401).json(...)

  // req.headers est vide : aucun token n'est fourni
  it("renvoie 401 si le header Authorization est absent", () => {
    // Arrange
    const req = { headers: {} };
    const res = mockRes();
    // next est mocké avec vi.fn() pour vérifier qu'il n'est pas appelé
    const next = vi.fn();

    // Act
    authenticateToken(req, res, next);

    // Assert
    // On vérifie que res.status a bien été appelé avec 401
    expect(res.status).toHaveBeenCalledWith(401);
    // On vérifie que next n'a pas été appelé : la requête est bloquée
    expect(next).not.toHaveBeenCalled();
  });

  // "Bearer token_invalide" est une chaîne qui ne correspond à aucun token JWT valide
  it("renvoie 401 si le token est invalide", () => {
    // Arrange
    const req = { headers: { authorization: "Bearer token_invalide" } };
    const res = mockRes();
    const next = vi.fn();

    // Act
    authenticateToken(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  // On génère un vrai token signé avec le secret de test pour reproduire une requête authentifiée
  it("appelle next() et renseigne req.user si le token est valide", () => {
    // Arrange
    const payload = { userId: 1, role: "user" };
    // jwt.sign génère un token signé avec notre secret de test
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = vi.fn();

    // Act
    authenticateToken(req, res, next);

    // Assert
    // On vérifie que next a bien été appelé : la requête est autorisée à continuer
    expect(next).toHaveBeenCalled();
    // On vérifie que req.user contient bien les données du payload
    expect(req.user).toMatchObject(payload);
  });
});
