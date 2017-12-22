// mini linear algebra library
function minus(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ];
}

function norm(v) {
    return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
}

function normal(v) {
    n = norm(v);
    return [v[0] / n, v[1] / n, v[2] / n];
}

function lookat(eye, at, up) { 
    const zaxis = normal(minus(at, eye))
    const xaxis = normal(cross(up, zaxis))
    const yaxis = cross(zaxis, xaxis)
    
    return [
        xaxis[0], xaxis[1], xaxis[2], -dot(xaxis, eye),
        yaxis[0], yaxis[1], yaxis[2], -dot(yaxis, eye),
        zaxis[0], zaxis[1], zaxis[2], -dot(zaxis, eye),
               0,        0,        0,                1,
    ];
}

// multiplies all 3-vectors in v with 4x4 matrix m.
function mul(m, v) {
    var tmp = [];
    for (var i = 0; i < v.length; i += 3) {
        var w =     m[12]*v[i+0] + m[13]*v[i+1] + m[14]*v[i+2] + m[15]*1;
        w = 1;
        tmp[i+0] = (m[ 0]*v[i+0] + m[ 1]*v[i+1] + m[ 2]*v[i+2] + m[ 3]*1)/w;
        tmp[i+1] = (m[ 4]*v[i+0] + m[ 5]*v[i+1] + m[ 6]*v[i+2] + m[ 7]*1)/w;
        tmp[i+2] = (m[ 8]*v[i+0] + m[ 9]*v[i+1] + m[10]*v[i+2] + m[11]*1)/w;
    }
    return tmp;
}

// mini 3D rendering library
function Camera() {
    var that = this;

    this.matrix = function() {
        return lookat(that.eye, that.at, that.up);
    };
}

function Wireframe(vertices, lines) {
    this.vertices = vertices;
    this.lines = lines;
}

function project(v, idx, screen, rx, ry) {
    const s = 196;
    const i = idx * 3;
    screen[0] = rx / 2 + v[i+0] * s / v[i+2];
    screen[1] = 2*ry/3 + v[i+1] * s / v[i+2];
}

function Renderer(el, rx, ry) {
    var front = el.getContext('2d');

    var backbuffer = document.createElement('canvas');
    backbuffer.setAttribute('width', rx);
    backbuffer.setAttribute('height', ry);
    var ctx = backbuffer.getContext('2d');

    this.render = function(wireframe, camera) {
        var vertices = mul(camera.matrix(), wireframe.vertices);

        ctx.clearRect(0, 0, rx, ry);

        ctx.strokeStyle = "lightgreen";
        ctx.lineWidth = 2;
        ctx.beginPath();
        var screen = [null, null];
        for (var i = 0; i < wireframe.lines.length; i++) {
            project(vertices,wireframe.lines[i][0], screen, rx, ry);
            ctx.moveTo(screen[0], screen[1]);
            for (var j = 1; j < wireframe.lines[i].length; j++) {
                project(vertices, wireframe.lines[i][j], screen, rx, ry);
                ctx.lineTo(screen[0], screen[1]);
            }
        }
        ctx.stroke();

        const tmp = ctx.getImageData(0, 0, rx, ry);
        
        front.clearRect(0, 0, el.width, el.height);
        const ratio = 4; // el.width/rx;
        front.setTransform(ratio, 0, 0, ratio, 0, 0);
        front.imageSmoothingEnabled = false;
        front.drawImage(backbuffer, 0, 0);
    }
}

function parseDecimalInt(s) {
    return parseInt(s, 10);
}

const load = {
    obj: function(text) {
        var positions = [];
        var ls = [];

        const lines = text.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#')) {
                continue;
            }
            const parts = lines[i].split(/\s+/);
            const op = parts.shift();
            if (op == 'v') {
                positions.push(
                    parseFloat(parts[0]),
                    parseFloat(parts[1]),
                    parseFloat(parts[2]),
                );
            }
            if (op == 'l') {
                ls.push(parts.map(parseDecimalInt));
            }
        }
        return new Wireframe(positions, ls);
    }
};

module.exports = { Wireframe, Renderer, Camera, load };
