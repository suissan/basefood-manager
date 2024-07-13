const express = require('express');
const router = express.Router();
const baseManager = require("../get-basefood-info");


/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title: 'Express' });
  baseManager.getBaseInfo()
  .then((data) => {
    console.log(data[0]);
    res.render('index', {title: data[0].name});
  });
  
});

module.exports = router;
