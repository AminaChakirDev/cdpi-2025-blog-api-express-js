import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import app from "../app.js";
import { resetDatabase } from "../helpers/resetDatabase.js";
import jwt from "jsonwebtoken";

beforeEach(async () => {
  await resetDatabase();
});

describe("GET /articles", () => {
  it("retourne 200 et la liste des articles", async () => {
    const response = await request(app).get("/articles");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);
  });
});

describe("GET /articles/:id", () => {
  it("retourne 200 et l'article correspondant", async () => {
    const response = await request(app).get("/articles/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("title", "Introduction à Node.js");
  });

  it("retourne 404 si l'article n'existe pas", async () => {
    const response = await request(app).get("/articles/999");

    expect(response.status).toBe(404);
  });
});

describe("POST /articles", () => {
  it("retourne 401 si aucun token n'est fourni", async () => {
    const response = await request(app)
      .post("/articles")
      .send({ title: "Nouvel article", content: "Contenu...", category_id: 1 });

    expect(response.status).toBe(401);
  });

  it("retourne 403 si le token appartient à un utilisateur sans le rôle admin", async () => {
    const token = jwt.sign({ userId: 2, role: "user" }, process.env.JWT_SECRET);

    const response = await request(app)
      .post("/articles")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Nouvel article", content: "Contenu...", category_id: 1 });

    expect(response.status).toBe(403);
  });

  it("retourne 201 et crée l'article si le token admin est valide", async () => {
    const token = jwt.sign(
      { userId: 1, role: "ADMIN" },
      process.env.JWT_SECRET,
    );

    const response = await request(app)
      .post("/articles")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Nouvel article", content: "Contenu...", category_id: 1 });

    console.log(response.body); // affiche l'erreur renvoyée par le serveur

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("title", "Nouvel article");
  });
});
