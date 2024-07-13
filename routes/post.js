const express = require('express');
const router = express.Router();


/* POST data */
router.post('/', function (req, res, next) {
  console.log(req.body.input);
  res.render("index")
});

module.exports = router;
