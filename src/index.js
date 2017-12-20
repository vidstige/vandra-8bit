import { request } from "http";

require("../style.css");
const nano3d = require('./nano3d');
const cube = require('./cube');

function onload() {
    console.log("onload");

    var element = document.getElementById('canvas');
    const renderer = new nano3d.Renderer(element);
    renderer.render(cube);
}

window.onload = onload;
