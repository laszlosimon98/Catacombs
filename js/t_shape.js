class TShape {
    arr = ["UP-RIGHT-LEFT", "RIGHT-UP-DOWN", "DOWN-RIGHT-LEFT", "LEFT-UP-DOWN"];
    shape;
    constructor(i, j, size, wdiff, hdiff, facing=this.rotate()) {
        this.i = i;
        this.j = j;
        this.x = i * size;
        this.y = j * size;
        this.wdiff = wdiff;
        this.hdiff = hdiff;
        this.len = 8;
        this.size = size / this.len;
        this.facing = facing;
        this.color = "yellow";
        this.treasure = 0;
    }

    setTreasure(i) {
        this.treasure = i;
    }

    getTreasure() {
        return this.treasure;
    }

    updateColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    getPos() {
        return [this.i, this.j];
    }

    updatePos(i, j) {
        this.i = i;
        this.j = j;
        this.x = i * this.size * this.len;
        this.y = j * this.size * this.len;
    }

    update_rotate() {
        let index = this.arr.indexOf(this.facing);
        this.facing = (index + 1 < this.arr.length) ? this.arr[index + 1] : this.arr[0];
    }

    rotate() {
        let index = Math.floor(Math.random() * this.arr.length);
        return this.arr[index];
    }

    init() {
        let arr = new Array()
        for (let i = 0; i < this.len; i++) {
            arr[i] = new Array();
            for (let j = 0; j < this.len; j++) {
                switch(this.facing) {
                    case "UP-RIGHT-LEFT":
                        if (i >= this.len - 2 || (i <= 1 && j <= 1 || i <= 1 && j >= this.len - 2)) {
                            arr[i].push(0);
                        } else {
                            arr[i].push(1);
                        }
                        break;
                    case "LEFT-UP-DOWN":
                        if (j >= this.len - 2 || (i >= this.len - 2 && j <= 1 || i <= 1 && j <= 1)) {
                            arr[i].push(0);
                        } else {
                            arr[i].push(1);
                        }
                        break;
                    case "DOWN-RIGHT-LEFT":
                        if (i <= 1 || (i >= this.len - 2 && j <= 1 || i >= this.len - 2 && j >= this.len - 2)) {
                            arr[i].push(0);
                        } else {
                            arr[i].push(1);
                        }
                        break;
                    case "RIGHT-UP-DOWN":
                        if (j <= 1 || (i >= this.len - 2 && j >= this.len - 2 || i <= 1 && j >= this.len - 2)) {
                            arr[i].push(0);
                        } else {
                            arr[i].push(1);
                        }
                        break;
                }
            }
        }
        return arr;
    }

    draw(context) {
        this.shape = this.init();
        for (let i = 0; i < this.len; i++) {
            for (let j = 0; j < this.len; j++) {
                let x = i * this.size + this.x + this.wdiff;
                let y = j * this.size + this.y + this.hdiff;

                context.beginPath();
                if (this.shape[j][i] === 0) {
                    context.fillStyle = "grey";
                } else {
                    context.fillStyle = this.color;
                }
                context.fillRect(x, y, this.size, this.size);
                context.closePath();
            }
        }
    }

}