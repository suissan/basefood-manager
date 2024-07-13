"use strict";

const puppeteer = require("puppeteer");


async function getBaseInfo() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://shop.basefood.co.jp/account/login");
    await page.type("#CustomerEmail", "suiMox7.sg@gmail.com");
    await page.type("#CustomerPassword", "u6e67u958b");
    await page.click('button[form="login"]');

    await page.waitForNavigation();

    await page.goto("https://shop.basefood.co.jp/mypage/subscription");

    await page.waitForSelector('.mypage__products');

    const boughtNumberArray = await page.evaluate(() => {
        const list = [];
        const productElements = Array.from(document.querySelectorAll('.mypage__products')); // 商品一覧
        const selectElements = Array.from(document.querySelectorAll('select')); // <select>要素を取得
        selectElements.forEach((ele, index) => {
            if (index <= 1) {
                return;
            }
            const productName = productElements[index - 2].children[1].innerHTML; // 商品の名前
            const editedName = productName.trim().split("\n")[0]; // 名前のみを抽出
            const boughtNumber = ele.options[ele.selectedIndex].innerText; // 買った個数
            const editedNumber = boughtNumber.match(/\d+/)[0]; // 数字の部分のみを抽出
            if (editedNumber != 0) {
                const obe = {};
                obe.name = editedName;
                obe.number = editedNumber;
                list.push(obe);
            }
        });
        return list;
    });

    //console.log("今回のベースブレッドの初期値");
    //for (let ele of boughtNumberArray) {
    //    console.log(`${ele.name}: 残り${ele.number}個`);
    //}

    await browser.close();

    return boughtNumberArray;
}

module.exports = {
    getBaseInfo
}