class Catacombs {
    board;
    arrows;
    startPoints;
    extraShape;
    arrowsPos;
    treasureSpots;
    players;
    currentPlayer;

    constructor(width, height, playerNumber, treasureNumber) {
        this.canvas = document.querySelector("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");

        this.boards = 8;
        this.cellSize = Math.ceil((Math.min(width, height) / this.boards - 5) / this.boards - 1) * this.boards;
        this.wdiff = (width - this.cellSize * (this.boards + 1)) / 2 - 30;
        this.hdiff = (height - this.cellSize * (this.boards - 1)) / 2;

        this.game = new Board(this.boards, this.cellSize, this.wdiff, this.hdiff, playerNumber, treasureNumber);

        // mouse
        this.click = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        // animations
        this.counter = 0;
        this.step = 2;
        this.moving = [false, false, false, false] // right, left, down, up;
        this.animation = false;

        // players
        this.currentIndex = 0;
        this.allowToMove = false;

        this.currentP = document.querySelector("#currentP");
        this.currentT = document.querySelector("#currentT");
        this.currentS = document.querySelector("#currentS");
        this.currentA = document.querySelector("#currentA");

        this.game_over = false;
        this.lastTableMove;
        this.isValidTableMove = true;
    }

    init() {
        this.board = this.game.getBoard();
        this.game.fillCells();
        this.startPoints = this.game.setStartPoints();
        this.arrows = this.game.createArrows();
        this.extraShape = this.game.getExtraShape();
        this.arrowsPos = this.game.getArrowsPos();
        this.treasures = this.game.setTreasures();
        this.players = this.game.setPlayers();
        this.currentPlayer = this.players[this.currentIndex];
        this.writeCurrentPlayer();
    }
    
    writeCurrentPlayer() {
        switch(this.currentPlayer.getColor()) {
            case "red":
                this.currentP.innerText = "Piros";
                this.currentP.style.color = "red";
                this.currentS.style.color = "red";
                break;
            case "green":
                this.currentP.innerText = "Zöld";
                this.currentP.style.color = "green";
                this.currentS.style.color = "green";
                break;
            case "blue":
                this.currentP.innerText = "Kék";
                this.currentP.style.color = "blue";
                this.currentS.style.color = "blue";
                break;
            case "purple":
                this.currentP.innerText = "Lila";
                this.currentP.style.color = "purple";
                this.currentS.style.color = "purple";
                break;
        }
        if (!this.currentPlayer.taskListIsEmpty()) {
            this.currentT.innerText = this.currentPlayer.getCurrentTask();
        } else {
            this.currentT.innerHTML = "<br>Kezdőpont";
        }
        this.currentS.innerText = this.currentPlayer.taskListLength();

        this.currentA.innerHTML = "";
        for (let i = 0; i < this.currentPlayer.found.length; i++) {
            this.currentA.innerHTML += this.currentPlayer.found[i] + "<br>";
        }
    }

    getPos(e) {
        let mouseX = Math.floor(e.offsetX / this.cellSize - this.wdiff / this.cellSize);
        let mouseY = Math.floor(e.offsetY / this.cellSize - this.hdiff / this.cellSize);
        for (let i = 0; i < this.arrowsPos.length; i++) {
            let x = this.arrowsPos[i][0];
            let y = this.arrowsPos[i][1];
            if (mouseX == x && mouseY == y) {
                if (!this.animation) {
                    this.extraShape.updatePos(mouseX, mouseY);
                    for (let i = 0; i < this.treasures.length; i++) {
                        if (this.treasures[i].onextra) {
                            this.treasures[i].updatePos(mouseX, mouseY);
                        }
                    }
                    
                }
            }
        }
    }

    shifting(e) {
        if (!this.animation) {
            this.mouseX = Math.floor(e.offsetX / this.cellSize - this.wdiff / this.cellSize);
            this.mouseY = Math.floor(e.offsetY / this.cellSize - this.hdiff / this.cellSize);

            if (e.button == 0) {
                if (!this.allowToMove || !this.isValidTableMove) {
                    for (let i = 0; i < this.arrowsPos.length; i++) {
                        let x = this.arrowsPos[i][0];
                        let y = this.arrowsPos[i][1];
                        if (this.mouseX == x && this.mouseY == y) {
                            this.allowToMove = true;
                            this.extraShape.updatePos(this.mouseX, this.mouseY);
                            for (let i = 0; i < this.treasures.length; i++) {
                                if (this.treasures[i].onextra) {
                                    this.treasures[i].updatePos(this.mouseX, this.mouseY);
                                }
                            }

                            if (this.mouseX == -1) {
                                this.moving[0] = true;
                            } else if (this.mouseX == 7) {
                                this.moving[1] = true;
                            } else if (this.mouseY == -1) {
                                this.moving[2] = true;
                            } else if (this.mouseY == 7) {
                                this.moving[3] = true;
                            }
                        }
                    }
                } else {
                    if (this.mouseX >= 0 && this.mouseX < 7 && this.mouseY >= 0 && this.mouseY < 7) {
                        if (this.board[this.mouseX][this.mouseY].getColor() == "lightgreen" && this.isValidTableMove) {
                            this.currentPlayer.updatePos(this.mouseX, this.mouseY);

                            if (!this.currentPlayer.taskListIsEmpty()) {
                                if (this.board[this.mouseX][this.mouseY].getTreasure() == this.currentPlayer.getCurrentTask()) {
                                    this.currentPlayer.completedTask();
                                    for (let i = 0; i < this.treasures.length; i++) {
                                        if (this.board[this.mouseX][this.mouseY].getPos()[0] == this.treasures[i].getPos()[0] &&
                                            this.board[this.mouseX][this.mouseY].getPos()[1] == this.treasures[i].getPos()[1]) {
                                                this.treasures[i].setValue(0);
                                            }
                                    }
                                }
                            } else {
                                if (this.currentPlayer.getPos()[0] == this.currentPlayer.getStartPoint()[0] &&
                                    this.currentPlayer.getPos()[1] == this.currentPlayer.getStartPoint()[1]) {
                                        this.game_over = true;
                                        setTimeout(() => {
                                            game_over = true;
                                        }, 3000);
                                }
                            }

                            if (!this.game_over) {
                                if (this.currentIndex == this.players.length - 1) this.currentIndex = -1;
                                this.currentIndex++;
                                this.currentPlayer = this.players[this.currentIndex];
                            }
                            this.writeCurrentPlayer();

                            this.onmove = true;
                            this.allowToMove = false;
                        }
                    }
                }
            } else if (e.button == 2) {
                this.extraShape.update_rotate();
            }
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.arrows.length; i++) {
            this.arrows[i].draw(this.context);
        }

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                this.board[i][j].draw(this.context);
                this.board[i][j].updateColor("yellow");
            }
        }

        this.extraShape.draw(this.context);
        this.extraShape.updateColor("yellow");

        for (let i = 0; i < this.startPoints.length; i++) {
            this.startPoints[i].draw(this.context);
        }

        for (let i = 0; i < this.treasures.length; i++) {
            this.treasures[i].draw(this.context);
        }

        for (let i = 0; i < this.players.length; i++) {
            this.players[i].draw(this.context);
        }

        this.game.showPath(this.currentPlayer.getPos());

        if (this.game_over) {
            let color;
            this.context.fillStyle = this.currentPlayer.getColor();
            this.context.font = "64px Arial";
            switch (this.currentPlayer.getColor()) {
                case "red":
                    color = "Piros";
                    break;
                case "green":
                    color = "Zöld";
                    break;
                case "blue":
                    color = "Kék";
                    break;
                case "purple":
                    color = "Lila";
                    break;
            }
            this.context.fillText(`A győztes: ${color}!`, this.canvas.width / 2, this.canvas.height / 2);
            this.context.textAlign = "center";
        }
    }

    update() {
        let check = this.moving.some((e) => e == true);
        if (this.click < 1) {
            this.canvas.addEventListener("mousemove", (e) => this.getPos(e));
            this.canvas.addEventListener("mousedown", (e) => this.shifting(e));
            this.click++;
        }

        if (check) {
            let index = this.moving.indexOf(true);
            this.animation = true;
            if (this.counter < this.cellSize) {
                switch (index) {
                    case 0:
                        [this.board, this.extraShape, this.treasures, this.players] = this.game.moveRight(this.step, this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                    case 1:
                        [this.board, this.extraShape, this.treasures, this.players] = this.game.moveLeft(this.step, this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                    case 2:
                        [this.board, this.extraShape, this.treasures, this.players] = this.game.moveDown(this.step, this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                    case 3:
                        [this.board, this.extraShape, this.treasures, this.players] = this.game.moveUp(this.step, this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                }
                this.counter += this.step;
            } else {
                switch (index) {
                    case 0:
                        [this.board, this.extraShape, this.treasures, this.players, this.lastTableMove, this.isValidTableMove] = this.game.shiftRight(this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                    case 1:
                        [this.board, this.extraShape, this.treasures, this.players, this.lastTableMove, this.isValidTableMove] = this.game.shiftLeft(this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                    case 2:
                        [this.board, this.extraShape, this.treasures, this.players, this.lastTableMove, this.isValidTableMove] = this.game.shiftDown(this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                    case 3:
                        [this.board, this.extraShape, this.treasures, this.players, this.lastTableMove, this.isValidTableMove] = this.game.shiftUp(this.board, this.mouseX, this.mouseY, this.extraShape, this.treasures, this.players, this.lastTableMove);
                        break;
                }
                this.animation = false;
                this.counter = 0;
                this.moving[index] = false;
            }
        }
    }

    mainloop() {
        this.draw();
        this.update();
    }
}