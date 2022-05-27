class Treasure {
    constructor(i, j, size, wdiff, hdiff, value, onextra=false) {
        this.i = i;
        this.j = j;
        this.x = i * size + size / 2 - 15;
        this.y = j * size + size / 2 - 15;
        this.value = value;
        this.s = size;
        this.size = 30;
        this.wdiff = wdiff;
        this.hdiff = hdiff;
        this.onextra = onextra;
    }

    getPos() {
        return [this.i, this.j];
    }

    setValue(x) {
        this.value = x;
    }

    draw(context) {
        context.fillStyle = "black";
        context.font = "32px Arial";
        if (this.value != 0) {
            context.fillText(this.value, this.x + this.wdiff, this.y + this.hdiff + 25);
        }
    }

    updatePos(i, j) {
        this.i = i;
        this.j = j;
        this.x = i * this.s + this.s / 2 - 15;
        this.y = j * this.s + this.s / 2 - 15;
    }
}