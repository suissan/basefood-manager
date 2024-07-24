const express = require('express');
const router = express.Router();
//const connection = require("../db");
const Stock = require("../models/stock");

/* GET home page. */
router.get('/', function (req, res, next) {
  const sql = "SELECT name, stock, code FROM products_stocks";
  //connection.query(sql, (err, results) => {
  //  res.render('index', { products: results });
  //  console.log(results);
  //});
  Stock.findAll()
  .then((result) => {
    res.render('index', {products: result});
    console.log(result);
  });
});

module.exports = router;
