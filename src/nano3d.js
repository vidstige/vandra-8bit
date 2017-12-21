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
        xaxis[0],         yaxis[0],         zaxis[0],         0,
        xaxis[1],         yaxis[1],         zaxis[1],         0,
        xaxis[2],         yaxis[2],         zaxis[2],         0,
        -dot(xaxis, eye), -dot(yaxis, eye), -dot(zaxis, eye), 1,
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

function Renderer(el, rx, ry) {
    var front = el.getContext('2d');

    var backbuffer = document.createElement('canvas');
    backbuffer.setAttribute('width', rx);
    backbuffer.setAttribute('height', ry);
    var ctx = backbuffer.getContext('2d');

    //var img = ctx.createImageData(320, 200);
    this.render = function(wireframe, camera) {
        var vertices = mul(camera.matrix(), wireframe.vertices);

        ctx.clearRect(0, 0, rx, ry);

        ctx.strokeStyle = "lightgreen";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var i = 0; i < wireframe.lines.length; i += 2) {
            var i0 = wireframe.lines[i + 0]*3;
            var i1 = wireframe.lines[i + 1]*3;

            var x0 = vertices[i0 + 0];
            var y0 = vertices[i0 + 1];
            var z0 = vertices[i0 + 2];
            var x1 = vertices[i1 + 0];
            var y1 = vertices[i1 + 1];
            var z1 = vertices[i1 + 2];

            const s = 64;
            ctx.moveTo(rx/2 + x0*s/(z0+5), ry/2 + y0*s/(z0+5));
            ctx.lineTo(rx/2 + x1*s/(z1+5), ry/2 + y1*s/(z1+5));
            
        }
        ctx.stroke();

        const tmp = ctx.getImageData(0, 0, rx, ry);
        
        front.clearRect(0, 0, el.width, el.height);
        const ratio = 8; // el.width/rx;
        front.setTransform(ratio, 0, 0, ratio, 0, 0);
        front.imageSmoothingEnabled = false;
        front.drawImage(backbuffer, 0, 0);
    }
}

module.exports = { Wireframe, Renderer, Camera };
