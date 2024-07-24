const express = require('express');
const router = express.Router();
const loader = require('../models/sequelize-loader');
const connection = loader.database;
const baseManager = require("../get-basefood-info");
const Stock = require("../models/stock");

// 個数を取得し表示する
router.get('/add-stocks', async function (req, res, next) {
  const selectSql = "SELECT name FROM products_stocks WHERE name = ?";
  const insertSql = "INSERT INTO products_stocks (name, stock) VALUES ?";
  const updateSql = "UPDATE products_stocks SET stock = ? WHERE name = ?";
  try {
    const products = await baseManager.getBaseInfo();

    for (const product of products) {
      const results = await Stock.findOne({ where: { name: product.name } });
      console.log(results)

      if (!results) {
        console.log("test")
        await Stock.create({ name: product.name, stock: product.number });
      } else {
        await Stock.update({ stock: product.number }, { where: { name: product.name } });
      }
    }

    res.redirect("/");

  } catch (error) {
    // エラーハンドリング
    res.status(500).send("エラーが発生しました");
  }
});

/* POST update-stock(在庫変更) */
router.post('/update-stock', async function (req, res, next) {
  console.log(req.body.input);
  try {
    const updateSql = "UPDATE products_stocks SET stock = stock - 1 WHERE code = ?";

    await Stock.update({ stock: Sequelize.literal('stock - 1') }, { where: { code: req.body.input } });

    res.redirect("/");

  } catch (error) {
    // エラーハンドリング
    res.status(500).send("エラーが発生しました");
  }
});

module.exports = router;