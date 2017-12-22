import { request } from "http";

require("../style.css");
const nano3d = require('./nano3d');
const cube = require('./cube');

function spinWireframe(w) {
    var element = document.getElementById('canvas');
    const renderer = new nano3d.Renderer(element, 160, 100);
    var camera = new nano3d.Camera();
    camera.at = [0, 0, 0];
    camera.up = [0, 1, 0];

    function spin(timestamp) {
        const t = timestamp / 2000.0;
        const r = 150;

        camera.eye = [r*Math.sin(t), r*Math.sin(t/2)/2, r*Math.cos(t)];
        renderer.render(w, camera);
        requestAnimationFrame(spin);
    }
    requestAnimationFrame(spin)
}

function onload() {

    fetch('vandra.obj').then(function (r) {
        return r.text()
    }).then(nano3d.load.obj).then(spinWireframe).catch(console.error);

    //spinWireframe(cube);
}

window.onload = onload;
