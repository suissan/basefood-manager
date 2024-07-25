'use strict';

const express = require('express');
const router = express.Router();
const Stock = require("../models/stock");

/* ホームページ表示 */
router.get('/', async (req, res, next) => {
  const results = await Stock.findAll({ order: [["id", "ASC"]] });
  res.render("index", { products: results });
});

module.exports = router;
