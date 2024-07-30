'use strict';

const puppeteer = require("puppeteer");
require("dotenv").config();

async function getBaseInfo() {
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    });

    try {
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); // タイムアウトを阻止(現段階の措置)
        await page.goto(process.env.LOGIN_URL);
        await page.type("#CustomerEmail", process.env.REGISTER_MAIL_ADDRESS);
        await page.type("#CustomerPassword", process.env.REGISTER_PASSWORD);
        await page.click('button[form="login"]');
        await page.waitForNavigation();
        await page.goto(process.env.TARGET_URL);
        await page.waitForSelector('.mypage__products');

        console.log("対象ページの取得が終了");

        const createProductsInfo = await page.evaluate(() => {
            const productsList = [];
            const productElements = Array.from(document.querySelectorAll('.mypage__products')); // 商品一覧
            const selectElements = Array.from(document.querySelectorAll('select')); // <select>要素を取得
            selectElements.forEach((ele, index) => {
                if (index <= 1) {
                    return;
                }
                const productName = productElements[index - 2].children[1].innerHTML.trim().split("\n")[0]; // 商品の名前
                const productStock = ele.options[ele.selectedIndex].innerText.match(/\d+/)[0]; // 買った個数
                if (editedNumber != 0) {
                    const productInfo = {};
                    productInfo.name = productName;
                    productInfo.stock = productStock;
                    productsList.push(productInfo);
                }
            });
            return productsList;
        });

        await browser.close();

        return createProductsInfo;

    } catch (error) {
        console.log(`puppeteerのエラー: ${error}`);
    }
}

module.exports = {
    getBaseInfo
}
