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

        await page.goto(process.env.LOGIN_URL);
        await page.type("#CustomerEmail", process.env.REGISTER_MAIL_ADDRESS);
        await page.type("#CustomerPassword", process.env.REGISTER_PASSWORD);
        await page.click('button[form="login"]');

        await page.waitForNavigation();

        await page.goto(process.env.TARGET_URL);

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

        await browser.close();

        return boughtNumberArray;

    } catch (error) {
        console.log(`puppeteerのエラー: ${error}`);
        //res.send(`Something went wrong while running Puppeteer: ${error}`);
    }
}

module.exports = {
    getBaseInfo
}
