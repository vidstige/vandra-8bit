import { request } from "http";

require("../style.css");
const nano3d = require('./nano3d');
const Pixels = require('./pixels');

// TODO: Create obj loader
require('../static/vandra.obj');

function Terminal(target, font, speed) {
    var buffer = [];
    speed = speed || 50;
    this.line = 0;


    this.print = function(text) {
        buffer[this.line] = text;
        this.line++;
    };

    this.update = function(timestamp) {
        const ctx = target.getContext('2d');
        ctx.fillStyle = "lightgreen";
        ctx.font = font;
        ctx.textBaseline = 'top';

        var delay = 1000; // ms
        var n = (timestamp - delay) / speed;
        const cursor = '▍';
        const end_delay = 15; // cycles
        for (var i = 0; i < buffer.length; i++) {
            var display = buffer[i].substring(0, n);
            if (n <= buffer[i].length + end_delay && n > 0) display += cursor;
            ctx.fillText(display, 4, 4 + i * 8);
            n -= buffer[i].length;
            n -= end_delay;
        }
        if (n >= 0) {
            delay += timestamp;
        }
    };
}

function spinWireframe(w) {
    var pixels = new Pixels(160, 100);
    const renderer =
        new nano3d.Renderer(pixels.backbuffer, 120, 40);
    var camera = new nano3d.Camera();
    camera.at = [0, 0, 0];
    camera.up = [0, 1, 0];

    const terminal = new Terminal(pixels.backbuffer, '8px x04b03');
    terminal.print('-- vandra-97 --');
    terminal.print('state: active');
    terminal.print('version: c80b4b9');
    terminal.print('');
    terminal.print('batch: unknown');
    terminal.print('residual: 1.3e-7');
    terminal.print('telemetry: up');
    terminal.print('transmitted: 13/127');
    terminal.print('rig: stable');
    terminal.print('');
    terminal.print('manufacturer: volumental');
    terminal.print('> | o');

    var element = document.getElementById('canvas');
    function spin(timestamp) {
        const t = timestamp / 4000.0;
        const r = 150;

        camera.eye = [r*Math.sin(t), -80, r*Math.cos(t)];
        renderer.render(w, camera);

        // Draw HUDs
        terminal.update(timestamp);
        
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
