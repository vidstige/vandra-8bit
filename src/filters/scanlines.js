function scanlines(el, alpha, size, start) {
    var ctx = el.getContext('2d');

    // Scan lines
    ctx.strokeStyle = "rgba(128, 128, 128, " + alpha + ")";
    ctx.lineWidth = size;
    ctx.beginPath();
    for (var y = start % (size*2); y < el.height; y += size*2) {
        ctx.moveTo(0, y);
        ctx.lineTo(el.width, y);
    }
    ctx.stroke();
}

module.exports = scanlines