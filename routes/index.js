const express = require('express');
const router = express.Router();

const baseManager = require("../get-basefood-info");

//const { connection } = require('../app.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  const sql = "SELECT * FROM products_stocks";
  //connection.query(sql, (err, results) => {
  //  console.log(results);
  //});
  res.render('index');
});

// 個数を取得し表示する
router.get('/get-my-info', function (req, res, next) {
  baseManager.getBaseInfo()
    .then((data) => {
      console.log(data[0]);
      res.render('index', { products: data });
    });
});

module.exports = router;
