"use strict";

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
        document.getElementById("input").value = code;
        document.querySelector("#productName").textContent = getProductName(code);
    }
});


function getProductName(code) {
    const getProducts = document.querySelectorAll("#productDisplay");
    console.log(getProducts)
    for (let product of getProducts) {
        if (product.lastChild.value == code) {
            const productName = product.firstChild.textContent.split(":")[0];
            return productName;
        }
    }
}