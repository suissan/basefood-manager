const express = require('express');
const router = express.Router();
const { getBaseInfo } = require('../get-basefood-info');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  getBaseInfo();
});

module.exports = router;
