'use strict';

const modeManage = document.getElementById("manage");
const modeRegister = document.getElementById("register");
const manageForm = document.getElementById("manageForm");
const registerForm = document.getElementById("registerForm");
const getProducts = document.querySelectorAll(".productDisplay");
const styleSheet = document.styleSheets[0]; // /public/stylesheets/style.css

/* 読み込みのたびに実行 */
(() => {
    /* バーコード登録済みの商品のリストを塗りつぶす */
    for (let product of getProducts) {
        if (product.lastChild.hasAttribute('value')) {
            product.classList.add('registered');
            styleSheet.insertRule(
                '.registered::marker {color: #04e69b}',
            )
        }
    }

    /* 状況に応じてラジオボタンのデフォルト値を決定 */
    const getRegistered = document.querySelectorAll(".registered");
    if (getRegistered.length != getProducts.length) {
        modeRegister.checked = true;
    } else {
        modeManage.checked = true;
    }

    handleRadioChange();

})();

/* バーコードリーダーの設定 */
Quagga.init({
    inputStream: {
        type: "LiveStream",
        target: document.querySelector('#cameraCanvas'),
        constraints: {
            facingMode: "environment"
        },
    },
    decoder: {
        readers: ["ean_reader"]
    }
},
    (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

/* バーコードを読み取ったあとの処理（枠で囲う等） */
Quagga.onProcessed((result) => {
    let ctx = Quagga.canvas.ctx.overlay;
    let canvas = Quagga.canvas.dom.overlay;

    ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));

    if (result) {
        if (result.box) {
            console.log(JSON.stringify(result.box));
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, ctx, { color: 'blue', lineWidth: 2 });
        }
    }

});

/* バーコードを完全に読み取った後の処理（読み取ったコード・商品名を表示等） */
let code;
let count = 0;
Quagga.onDetected((result) => {
    if (code == result.codeResult.code) {
        count++;
    } else {
        count = 0;
        code = result.codeResult.code;
    }
    if (count >= 3 && /^45/.test(code)) {
        if (!modeManage.checked) {
            document.getElementById("registerCodeInput").value = code;
            return;
        }
        document.getElementById("verifyCodeInput").value = code;
        document.getElementById("productName").textContent = getProductName(code);
    }
});

/**
 * 商品名を返す関数
 * @param {String} code リーダーで読み取ったコード
 * @returns 商品名
 */
function getProductName(code) {
    for (let product of getProducts) {
        if (product.lastChild.value == code) {
            return product.firstChild.textContent.split(":")[0]; // 商品名を取得
        }
    }
}

/* ラジオボタンでどのフォームを表示するか決定する */
function handleRadioChange() {
    if (modeManage.checked) {
        manageForm.style.visibility = "visible";
        registerForm.style.visibility = "hidden";
    } else if (modeRegister.checked) {
        registerForm.style.visibility = "visible";
        manageForm.style.visibility = "hidden";
    }
}

/* ラジオボタンで在庫管理フォームの表示 */
modeManage.addEventListener("change", handleRadioChange);

/* ラジオボタンでバーコード登録フォームを表示 */
modeRegister.addEventListener("change", handleRadioChange);
