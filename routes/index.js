const express = require('express');
const router = express.Router();
const connection = require("../db");

/* GET home page. */
router.get('/', function (req, res, next) {
  const sql = "SELECT name, stock FROM products_stocks";
  connection.query(sql, (err, results) => {
    res.render('index', { products: results });
    console.log(results);
  });
});

module.exports = router;
