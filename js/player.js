class Player {
    constructor(i, j, size, rectSize, color, wdiff, hdiff, tasks, num) {
        this.i = i;
        this.j = j;
        this.x = i * size + size / 2;
        this.y = j * size + size / 2;
        this.size = size;
        this.rectSize = rectSize;
        this.color = color;
        this.wdiff = wdiff;
        this.hdiff = hdiff;

        this.num = num;
        this.taskList = tasks;
        this.found = []

        this.startPoint = [i, j];
    }

    updatePos(i, j) {
        this.i = i;
        this.j = j;
        this.x = i * this.size + this.size / 2;
        this.y = j * this.size + this.size / 2;
    }

    getCurrentTask() {
        return this.taskList[0];
    }

    completedTask() {
        this.found.push(this.getCurrentTask());
        this.taskList.splice(0, 1);
    }

    taskListIsEmpty() {
        return this.taskList.length == 0;
    }

    taskListLength() {
        return this.taskList.length;
    }

    getStartPoint() {
        return this.startPoint;
    }

    getColor() {
        return this.color;
    }

    getPos() {
        return [this.i, this.j];
    }

    draw(context) {
        context.fillStyle = this.color;
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.beginPath();
        if (this.num == 0) {
            context.fillRect(this.x + this.wdiff - this.rectSize + 15, this.y + this.hdiff - this.rectSize + 15, this.rectSize - 15, this.rectSize - 15);
            context.strokeRect(this.x + this.wdiff - this.rectSize + 15, this.y + this.hdiff - this.rectSize + 15, this.rectSize - 15, this.rectSize - 15);
        } else if (this.num == 1) {
            context.fillRect(this.x + this.wdiff - this.rectSize + 30, this.y + this.hdiff - this.rectSize + 15, this.rectSize - 15, this.rectSize - 15);
            context.strokeRect(this.x + this.wdiff - this.rectSize + 30, this.y + this.hdiff - this.rectSize + 15, this.rectSize - 15, this.rectSize - 15);
        } else if (this.num == 2) {
            context.fillRect(this.x + this.wdiff - this.rectSize + 15, this.y + this.hdiff - this.rectSize + 30, this.rectSize - 15, this.rectSize - 15);
            context.strokeRect(this.x + this.wdiff - this.rectSize + 15, this.y + this.hdiff - this.rectSize + 30, this.rectSize - 15, this.rectSize - 15);
        } else if (this.num == 3) {
            context.fillRect(this.x + this.wdiff - this.rectSize + 30, this.y + this.hdiff - this.rectSize + 30, this.rectSize - 15, this.rectSize - 15);
            context.strokeRect(this.x + this.wdiff - this.rectSize + 30, this.y + this.hdiff - this.rectSize + 30, this.rectSize - 15, this.rectSize - 15);
        }
        context.closePath();
    }
}