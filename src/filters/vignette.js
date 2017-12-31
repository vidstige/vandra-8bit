function vignette(el) {
    var ctx = el.getContext('2d');
    const gx = el.width / 2;
    const gy = el.height / 2;
    var gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, el.height*1.4);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, el.width, el.height);
}

module.exports = vignette;
