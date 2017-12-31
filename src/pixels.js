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
        // Reset transformation
        front.setTransform(1, 0, 0, 1, 0, 0);


        // Scan lines
        const start = 
        front.strokeStyle = "rgba(255, 255, 255, 0.08)";
        front.lineWidth = 4;
        front.beginPath();
        for (var y = 0; y < el.height; y += 8) {
            front.moveTo(0, y);
            front.lineTo(el.width, y);
        }
        front.stroke();

        // vignette
        const gx = el.width / 2;
        const gy = el.height / 2;
        var vignette = front.createRadialGradient(gx, gy, 0, gx, gy, el.height*1.4);
        vignette.addColorStop(0, "transparent");
        vignette.addColorStop(1, "black");
        front.fillStyle = vignette;
        front.fillRect(0, 0, el.width, el.height);
    };
}

module.exports = Pixels;