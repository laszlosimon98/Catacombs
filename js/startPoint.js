class StartPoint {
    constructor(i, j, size, radius, color, wdiff, hdiff) {
        this.x = i * size + size / 2;
        this.y = j * size + size / 2;
        this.radius = radius;
        this.color = color;
        this.wdiff = wdiff;
        this.hdiff = hdiff;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x + this.wdiff, this.y + this.hdiff, this.radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();

        context.font = "16px Arial";
        context.fillStyle = "white";
        context.fillText("SP", this.x + this.wdiff - 10, this.y + this.hdiff + 6);
    }
}