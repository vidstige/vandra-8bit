import { request } from "http";

require("../style.css");
const nano3d = require('./nano3d');
const cube = require('./cube');

function onload() {
    console.log("onload");

    console.log(cube);

    var element = document.getElementById('canvas');
    var ctx = element.getContext('2d');
    var img = ctx.createImageData(320, 200);
    for (var i = 0; i < img.width * img.height * 4; i += 4) {
        img.data[i + 0] = 0xff;
        img.data[i + 1] = 0;
        img.data[i + 2] = 0;
        img.data[i + 3] = 0xff;
    }
    ctx.putImageData(img, 0, 0);
}

window.onload = onload;
