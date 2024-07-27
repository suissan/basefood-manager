'use strict';

const express = require('express');
const router = express.Router();
const Stock = require("../models/stock");

/* ホームページ表示 */
router.get('/', async (req, res, next) => {
  const results = await Stock.findAll({ order: [["id", "ASC"]] });
  res.render("index", { products: results });
});

router.get('/usage', async (req, res, next) => {
  res.render("usage");
});

module.exports = router;
