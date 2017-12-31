function scanlines(el) {
    var ctx = el.getContext('2d');

    // Scan lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (var y = 0; y < el.height; y += 8) {
        ctx.moveTo(0, y);
        ctx.lineTo(el.width, y);
    }
    ctx.stroke();
}

module.exports = scanlines