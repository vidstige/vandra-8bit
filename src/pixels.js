function Pixels(rx, ry) {
    this.backbuffer = document.createElement('canvas');
    this.backbuffer.setAttribute('width', rx);
    this.backbuffer.setAttribute('height', ry);

    this.update = function(el) {
        var front = el.getContext('2d');

        // Copy to front buffer
        const tmp = this.backbuffer.getContext('2d').getImageData(0, 0, rx, ry);
        
        front.clearRect(0, 0, el.width, el.height);
        const ratio = el.width / rx;
        front.setTransform(ratio, 0, 0, ratio, 0, 0);
        front.imageSmoothingEnabled = false;
        front.drawImage(this.backbuffer, 0, 0);

        // vignette
        const gx = rx / 2;
        const gy = ry / 2;
        var vignette = front.createRadialGradient(gx, gy, 0, gx, gy, 200);
        vignette.addColorStop(0, "transparent");
        vignette.addColorStop(1, "rgba(0,0,0, 10)");
        front.fillStyle = vignette;
        front.fillRect(0, 0, el.width, el.height);
    };
}

module.exports = Pixels;