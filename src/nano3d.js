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

function Wireframe(vertices, lines) {
    this.vertices = vertices;
    this.lines = lines;
}

function Renderer(el) {
    var ctx = el.getContext('2d');
    //var img = ctx.createImageData(320, 200);
    this.render = function(wireframe, camera) {
        var eye = [0.0, 0.0, -2];
        var at = [0, 0, 0];
        var up = [0, 1, 0];
        var camera = lookat(eye, at, up);
        var vertices = mul(camera, wireframe.vertices);

        ctx.strokeStyle = "green";
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

            ctx.moveTo(160+x0*64, 100+y0*64);
            ctx.lineTo(160+x1*64, 100+y1*64);
        }
        ctx.stroke();
        
        /*for (var i = 0; i < img.width * img.height * 4; i += 4) {
            img.data[i + 0] = 0;
            img.data[i + 1] = 0;
            img.data[i + 2] = 0;
            img.data[i + 3] = 0xff;
        }
        ctx.putImageData(img, 0, 0);*/
    }
}

module.exports = { Wireframe, Renderer };
