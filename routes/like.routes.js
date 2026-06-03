import express from "express";

const router = express.Router();

import { createLike, deleteLike } from "../controllers/like.controller.js";

router.post("/", createLike);
router.delete("/", deleteLike);

export default router;
