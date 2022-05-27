class Arrow {
    constructor(i, j, size, wdiff, hdiff, direction) {
        this.x = i * size + size / 2;
        this.y = j * size + size / 2;
        this.wdiff = wdiff;
        this.hdiff = hdiff;
        this.direction = direction;
    }

    draw(context) {
        context.strokeStyle = "yellow";
        context.lineWidth = 4;
        switch(this.direction) {
            case "toRight":
                context.beginPath();
                context.moveTo(this.x + this.wdiff + 25, this.y + this.hdiff);
                context.lineTo(this.x + this.wdiff - 5, this.y - 15 + this.hdiff);
                context.moveTo(this.x + this.wdiff + 25, this.y + this.hdiff);
                context.lineTo(this.x + this.wdiff - 5, this.y + 15 + this.hdiff);
                context.closePath();
                break;
            case "toLeft":
                context.beginPath();
                context.moveTo(this.x + this.wdiff - 25, this.y + this.hdiff);
                context.lineTo(this.x + this.wdiff + 5, this.y - 15 + this.hdiff);
                context.moveTo(this.x + this.wdiff - 25, this.y + this.hdiff);
                context.lineTo(this.x + this.wdiff + 5, this.y + 15 + this.hdiff);
                context.closePath();
                break;
            case "toDown":
                context.beginPath();
                context.moveTo(this.x + this.wdiff, this.y + this.hdiff + 25);
                context.lineTo(this.x - 15 + this.wdiff, this.y + this.hdiff - 5);
                context.moveTo(this.x + this.wdiff, this.y + this.hdiff + 25);
                context.lineTo(this.x + 15 + this.wdiff, this.y + this.hdiff - 5 );
                context.closePath();
                break;
            case "toUp":
                context.beginPath();
                context.moveTo(this.x + this.wdiff, this.y + this.hdiff - 25);
                context.lineTo(this.x - 15 + this.wdiff, this.y + this.hdiff + 5);
                context.moveTo(this.x + this.wdiff, this.y + this.hdiff - 25);
                context.lineTo(this.x + 15 + this.wdiff, this.y + this.hdiff + 5 );
                context.closePath();
                break;
        }
        context.stroke();
    }
}