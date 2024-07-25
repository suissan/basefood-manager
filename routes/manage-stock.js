const express = require('express');
const router = express.Router();
const baseManager = require("../get-basefood-info");
const Stock = require("../models/stock");
const loader = require('../models/sequelize-loader');
const Sequelize = loader.Sequelize;

// 個数を取得し表示する
router.get('/add-stocks', async (req, res, next) => {
  try {
    const products = await baseManager.getBaseInfo();

    for (const product of products) {
      const results = await Stock.findOne({ where: { name: product.name } });

      if (!results) {
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
router.post('/update-stock', async (req, res, next) => {
  try {
    await Stock.update({ stock: Sequelize.literal('stock - 1') }, { where: { code: req.body.verifyCode } });

    res.redirect("/");

  } catch (error) {

    // エラーハンドリング
    res.status(500).send("エラーが発生しました");
  }
});

router.post('/register-code', async (req, res, next) => {
  const registerInfo = req.body.registerCode;
  const productCode = registerInfo.split(" ")[0]; // バーコード
  const productName = registerInfo.split(" ")[1]; // 商品名

  try {
    const product = await Stock.findOne({ where: { name: productName } });
    if (!product) {
    } 
    await Stock.update({ code: productCode }, { where: { name: product.name} });

    res.redirect("/");

  } catch (error) {

    // エラーハンドリング
    res.status(500).send("エラーが発生しました");
  }
});

module.exports = router;