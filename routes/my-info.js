const express = require('express');
const router = express.Router();

//// マイページから情報を取得するモジュールを追加
//const baseManager = require("../get-basefood-info");
//
//// 個数を取得し表示する
//router.get('/', function (req, res, next) {
//    baseManager.getBaseInfo()
//        .then((data) => {
//            console.log(data[0]);
//            res.render('index', { products: data });
//        });
//});

module.exports = router;
