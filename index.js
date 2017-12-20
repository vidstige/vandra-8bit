require("./style.css");

function onload() {
    console.log("onload");
    var element = document.getElementById('canvas');
    var ctx = element.getContext('2d');
    img = ctx.createImageData(320, 200);
    for (var i = 0; i < img.width * img.height * 4; i += 4) {
        img.data[i + 0] = 0xff;
        img.data[i + 1] = 0;
        img.data[i + 2] = 0;
        img.data[i + 3] = 0xff;
    }
    ctx.putImageData(img, 0, 0);
}

window.onload = onload;