'use strict';

const express = require('express');
const router = express.Router();
const Stock = require("../models/stock");

/* ホームページ表示 */
router.get('/', async (req, res, next) => {
  try {
    const results = await Stock.findAll({ order: [["id", "ASC"]] });
    res.render("index", { products: results });

  } catch (error) {
    res.status(500).send("エラーが発生しました");
    console.log(`エラー: ${error}`);
  }
});

router.get('/usage', (req, res, next) => {
  res.render("usage");
});

module.exports = router;
