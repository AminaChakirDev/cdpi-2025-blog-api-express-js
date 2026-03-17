const express = require("express");
const router = express.Router();

const {
  createLike,
  deleteLike,
} = require("../controllers/like.controller");

router.post("/", createLike);
router.delete("/", deleteLike);

module.exports = router;
