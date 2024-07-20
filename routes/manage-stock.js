const express = require('express');
const router = express.Router();
const connection = require("../db");
const baseManager = require("../get-basefood-info");

// 個数を取得し表示する
router.get('/add-stocks', async function (req, res, next) {
  const selectSql = "SELECT name FROM products_stocks WHERE name = ?";
  const insertSql = "INSERT INTO products_stocks (name, stock) VALUES ?";
  const updateSql = "UPDATE products_stocks SET stock = ? WHERE name = ?";
  
  try {
    const products = await baseManager.getBaseInfo();
    
    for (const product of products) {
      const results = await new Promise((resolve, reject) => {
        connection.query(selectSql, [product.name], (err, results) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      if (results.length === 0) {
        const value = [[product.name, product.number]];
        await new Promise((resolve, reject) => {
          connection.query(insertSql, [value], (err) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      } else {
        await new Promise((resolve, reject) => {
          connection.query(updateSql, [product.number, product.name], (err, results) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
    }

    res.redirect("/");
  } catch (error) {
    // エラーハンドリング
    res.status(500).send("エラーが発生しました");
  }
});

/* POST data */
router.post('/update-stock', function (req, res, next) {
  console.log(req.body.input);
  res.redirect("/");
});

module.exports = router;
