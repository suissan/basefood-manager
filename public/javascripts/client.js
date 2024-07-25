'use strict';

const modeManage = document.getElementById("manage");
const modeRegister = document.getElementById("register");
const formResult = document.getElementById("formResult");
const formCode = document.getElementById("formCode");

/* バーコードリーダーの設定 */
Quagga.init({
    inputStream: {
        type: "LiveStream",
        target: document.querySelector('#cameraCanvas')
    },
    constraints: {
        facingMode: "environment"
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
            console.log("コード登録モードだよ")
            document.getElementById("registerCodeInput").value = code;
            return;
        }
        console.log("在庫管理モードだよ")
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
    const getProducts = document.querySelectorAll(".productDisplay");
    for (let product of getProducts) {
        if (product.lastChild.value == code) {
            return product.firstChild.textContent.split(":")[0]; // 商品名を取得
        }
    }
}

/* ラジオボタンで在庫管理フォームの表示 */
modeManage.addEventListener("change", () => {
    if (modeManage.checked) {
        formResult.style.visibility = "visible";
        formCode.style.visibility = "hidden";
    }
});

/* ラジオボタンでバーコード登録フォームを表示 */
modeRegister.addEventListener("change", () => {
    if (modeRegister.checked) {
        formCode.style.visibility = "visible";
        formResult.style.visibility = "hidden";
    }
});
