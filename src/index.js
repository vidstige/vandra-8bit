import { request } from "http";

require("../style.css");
const nano3d = require('./nano3d');
const cube = require('./cube');

function spinWireframe(w) {
    var element = document.getElementById('canvas');
    const renderer = new nano3d.Renderer(element, 80, 50);
    var camera = new nano3d.Camera();
    camera.at = [0, 0, 0];
    camera.up = [0, 1, 0];

    function spin(timestamp) {
        const t = timestamp / 2000.0
        camera.eye = [Math.sin(t), Math.sin(t/2)/10, Math.cos(t)];
        renderer.render(w, camera);
        requestAnimationFrame(spin);
    }
    requestAnimationFrame(spin)
}

function onload() {
/*
    fetch('vandra.obj').then(function (r) {
        return r.text()
    }).then(nano3d.load.obj).then(spinWireframe).catch(console.error);
*/
    spinWireframe(cube);
}

window.onload = onload;
