import { request } from "http";

require("../style.css");
const nano3d = require('./nano3d');
const cube = require('./cube');
const Pixels = require('./pixels');

function spinWireframe(w) {
    var pixels = new Pixels(80, 50);
    const renderer = new nano3d.Renderer(pixels.backbuffer, 80, 50);
    var camera = new nano3d.Camera();
    camera.at = [0, 0, 0];
    camera.up = [0, 1, 0];

    var element = document.getElementById('canvas');
    function spin(timestamp) {
        const t = timestamp / 2000.0;
        const r = 150;

        camera.eye = [r*Math.sin(t), -80, r*Math.cos(t)];
        renderer.render(w, camera);

        // Draw HUDs
        var ctx = pixels.backbuffer.getContext('2d');
        ctx.fillStyle = "lightgreen";
        ctx.font = '8px x04b03';
        ctx.fillText('04b03', 1, 12);
        
        
        pixels.update(element);
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
