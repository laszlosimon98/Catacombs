class Board {
    constructor(boards, cellSize, wdiff, hdiff, playerNumber, treasureNumber){
        this.boards = boards;
        this.cellSize = cellSize;
        this.wdiff = wdiff;
        this.hdiff = hdiff;

        // shape max numbers
        this.straightCount = 13;
        this.curveCount = 15;
        this.tCount = 6;

        this.board = this.createBoard();
        
        // startPoints / players
        this.colors = ["red", "green", "blue", "purple"];

        // arrows
        this.arrowsPos = [
            [-1, 1], [-1, 3], [-1, 5], // 1.column
            [1, -1], [3, -1], [5, -1], // 1.row
            [this.boards - 1, 1], [this.boards - 1, 3], [this.boards - 1, 5], // last column
            [1, this.boards - 1], [3, this.boards - 1], [5, this.boards - 1] // last row
        ]

        // settings
        this.startPlayerNumber = playerNumber; // set by players
        this.treasureCounter = treasureNumber; // set by players

        // extra shape
        this.extraShape;
    }

    getExtraShape() {
        return this.extraShape;
    }

    getBoard() {
        return this.board;
    }

    getArrowsPos() {
        return this.arrowsPos;
    }

    createBoard() {
        let arr = new Array();
        for (let i = 0; i < this.boards - 1; i++) {
            arr[i] = new Array();
            for (let j = 0; j < this.boards - 1; j++) {
                arr[i][j] = new Array();
            }
        }
        return arr;
    }

    treasureSpots() {
        let ts = new Array();
        for (let i = 0; i < this.boards - 1; i++) {
            for (let j = 0; j < this.boards - 1; j++) {
                if (!(i == 0 && j == 0 || i == this.boards - 2 && j == 0 || i == 0 && j == this.boards - 2 || i == this.boards - 2 && j == this.boards - 2)) {
                    ts.push([i, j]);
                }
            }
        }
        return ts;
    }

    spots() {
        let arr = new Array();
        for (let i = 0; i < this.boards - 1; i++) {
            for (let j = 0; j < this.boards - 1; j++) {
                if (i % 2 != 0 || j % 2 != 0) {
                    arr.push([i,j]);
                }
            }
        }
        return arr;
    }

    // fix Elements
    fillCells() {
        // corners
        this.board[0][0] = new CurveShape(0, 0, this.cellSize, this.wdiff, this.hdiff, "DOWN-RIGHT"); // top-left
        this.board[6][0] = new CurveShape(6, 0, this.cellSize, this.wdiff, this.hdiff, "DOWN-LEFT");  // top-right
        this.board[0][6] = new CurveShape(0, 6, this.cellSize, this.wdiff, this.hdiff, "UP-RIGHT");   // bottom-left
        this.board[6][6] = new CurveShape(6, 6, this.cellSize, this.wdiff, this.hdiff, "UP-LEFT");    // bottom-right

        // 1. row
        this.board[2][0] = new TShape(2, 0, this.cellSize, this.wdiff, this.hdiff, "DOWN-RIGHT-LEFT");
        this.board[4][0] = new TShape(4, 0, this.cellSize, this.wdiff, this.hdiff, "DOWN-RIGHT-LEFT");

        // 3. row
        this.board[0][2] = new TShape(0, 2, this.cellSize, this.wdiff, this.hdiff, "RIGHT-UP-DOWN");
        this.board[2][2] = new TShape(2, 2, this.cellSize, this.wdiff, this.hdiff, "RIGHT-UP-DOWN");
        this.board[4][2] = new TShape(4, 2, this.cellSize, this.wdiff, this.hdiff, "DOWN-RIGHT-LEFT");
        this.board[6][2] = new TShape(6, 2, this.cellSize, this.wdiff, this.hdiff, "LEFT-UP-DOWN");

        // 5. row
        this.board[0][4] = new TShape(0, 4, this.cellSize, this.wdiff, this.hdiff, "RIGHT-UP-DOWN");
        this.board[2][4] = new TShape(2, 4, this.cellSize, this.wdiff, this.hdiff, "UP-RIGHT-LEFT");
        this.board[4][4] = new TShape(4, 4, this.cellSize, this.wdiff, this.hdiff, "LEFT-UP-DOWN");
        this.board[6][4] = new TShape(6, 4, this.cellSize, this.wdiff, this.hdiff, "LEFT-UP-DOWN");
        
        // 7. row
        this.board[2][6] = new TShape(2, 6, this.cellSize, this.wdiff, this.hdiff, "UP-RIGHT-LEFT");
        this.board[4][6] = new TShape(4, 6, this.cellSize, this.wdiff, this.hdiff, "UP-RIGHT-LEFT");

        // random elements
        let spots = this.spots();
        let spotsLength = spots.length;
        let choice = ["S", "C", "T"];

        for (let i = 0; i < spotsLength; i++) {

            let shapeIndex = Math.floor(Math.random() * choice.length)
            let shape = choice[shapeIndex];

            let index = Math.floor(Math.random() * spots.length);
            let x = spots[index][0];
            let y = spots[index][1];

            switch(shape) {
                case "S":
                    this.board[x][y] = new StraightLineShape(x, y, this.cellSize, this.wdiff, this.hdiff);
                    this.straightCount--;
                    break;
                case "C":
                    this.board[x][y] = new CurveShape(x, y, this.cellSize, this.wdiff, this.hdiff);
                    this.curveCount--;
                    break;
                case "T":
                    this.board[x][y] = new TShape(x, y, this.cellSize, this.wdiff, this.hdiff);
                    this.tCount--;
                    break;
            }

            if (this.straightCount == 0) {
                choice.splice(shapeIndex, 1);
                this.straightCount--;
            } else if (this.curveCount == 0) {
                choice.splice(shapeIndex, 1);
                this.curveCount--;
            } else if (this.tCount == 0) {
                choice.splice(shapeIndex, 1);
                this.tCount--;
            }

            spots.splice(index, 1);
        }

        //  extra
        let shape = choice[0];
        let extraShapeRandomPos = Math.floor(Math.random() * this.arrowsPos.length);
        switch(shape) {
            case "S":
                this.extraShape = new StraightLineShape(this.arrowsPos[extraShapeRandomPos][0], this.arrowsPos[extraShapeRandomPos][1], this.cellSize, this.wdiff, this.hdiff);
                this.straightCount--;
                break;
            case "C":
                this.extraShape = new CurveShape(this.arrowsPos[extraShapeRandomPos][0], this.arrowsPos[extraShapeRandomPos][1], this.cellSize, this.wdiff, this.hdiff);
                this.curveCount--;
                break;
            case "T":
                this.extraShape = new TShape(this.arrowsPos[extraShapeRandomPos][0], this.arrowsPos[extraShapeRandomPos][1], this.cellSize, this.wdiff, this.hdiff);
                this.tCount--;
                break;
        }
    }

    createArrows() {
        let arr = new Array();
        for (let i = 0; i < this.arrowsPos.length; i+=3) {
            if (i == 0) {
                arr.push(new Arrow(this.arrowsPos[i][0], this.arrowsPos[i][1], this.cellSize, this.wdiff, this.hdiff, "toRight"));
                arr.push(new Arrow(this.arrowsPos[i+1][0], this.arrowsPos[i+1][1], this.cellSize, this.wdiff, this.hdiff, "toRight"));
                arr.push(new Arrow(this.arrowsPos[i+2][0], this.arrowsPos[i+2][1], this.cellSize, this.wdiff, this.hdiff, "toRight"));
            } else if (i == 3) {
                arr.push(new Arrow(this.arrowsPos[i][0], this.arrowsPos[i][1], this.cellSize, this.wdiff, this.hdiff, "toDown"));
                arr.push(new Arrow(this.arrowsPos[i+1][0], this.arrowsPos[i+1][1], this.cellSize, this.wdiff, this.hdiff, "toDown"));
                arr.push(new Arrow(this.arrowsPos[i+2][0], this.arrowsPos[i+2][1], this.cellSize, this.wdiff, this.hdiff, "toDown"));
            } else if (i == 6) {
                arr.push(new Arrow(this.arrowsPos[i][0], this.arrowsPos[i][1], this.cellSize, this.wdiff, this.hdiff, "toLeft"));
                arr.push(new Arrow(this.arrowsPos[i+1][0], this.arrowsPos[i+1][1], this.cellSize, this.wdiff, this.hdiff, "toLeft"));
                arr.push(new Arrow(this.arrowsPos[i+2][0], this.arrowsPos[i+2][1], this.cellSize, this.wdiff, this.hdiff, "toLeft"));
            } else if (i == 9) {
                arr.push(new Arrow(this.arrowsPos[i][0], this.arrowsPos[i][1], this.cellSize, this.wdiff, this.hdiff, "toUp"));
                arr.push(new Arrow(this.arrowsPos[i+1][0], this.arrowsPos[i+1][1], this.cellSize, this.wdiff, this.hdiff, "toUp"));
                arr.push(new Arrow(this.arrowsPos[i+2][0], this.arrowsPos[i+2][1], this.cellSize, this.wdiff, this.hdiff, "toUp"));
            }
        }
        return arr;
    }

    setStartPoints() {
        let arr = new Array();
        for (let i = 0; i < this.startPlayerNumber; i++) {
            if (i == 0) {
                arr.push(new StartPoint(0, 0, this.cellSize, 15, this.colors[i], this.wdiff, this.hdiff));
            } else if (i == 1) {
                arr.push(new StartPoint(6, 0, this.cellSize, 15, this.colors[i], this.wdiff, this.hdiff));
            } else if (i == 2) {
                arr.push(new StartPoint(0, 6, this.cellSize, 15, this.colors[i], this.wdiff, this.hdiff));
            } else if (i == 3){
                arr.push(new StartPoint(6, 6, this.cellSize, 15, this.colors[i], this.wdiff, this.hdiff));
            }
        }
        return arr;
    }

    setPlayers() {
        let treasureArray = [];
        for (let i = 0; i < this.treasureCounter; i++) {
            treasureArray.push(i + 1);
        }

        let arr = new Array();
        for (let i = 0; i < this.startPlayerNumber; i++) {
            let task = [];
            for (let j = 0; j < this.treasureCounter / this.startPlayerNumber; j++) {
                let rnd = Math.floor(Math.random() * treasureArray.length);
                task.push(treasureArray[rnd]);
                treasureArray.splice(rnd, 1);
            }

            if (i == 0) {
                arr.push(new Player(0, 0, this.cellSize, 30, this.colors[i], this.wdiff, this.hdiff, task, i));
            } else if (i == 1) {
                arr.push(new Player(6, 0, this.cellSize, 30, this.colors[i], this.wdiff, this.hdiff, task, i));
            } else if (i == 2) {
                arr.push(new Player(0, 6, this.cellSize, 30, this.colors[i], this.wdiff, this.hdiff, task, i));
            } else if (i == 3){
                arr.push(new Player(6, 6, this.cellSize, 30, this.colors[i], this.wdiff, this.hdiff, task, i));
            }
        }
        return arr;
    }

    setTreasures() {
        let trspots = this.treasureSpots();
        let arr = new Array();
        for (let i = 0; i < this.treasureCounter; i++) {
            let rndts = Math.floor(Math.random() * trspots.length);
            let x = trspots[rndts][0];
            let y = trspots[rndts][1];

            arr.push(new Treasure(x, y, this.cellSize, this.wdiff, this.hdiff, i+1));
            this.board[x][y].setTreasure(i+1);
            trspots.splice(rndts, 1);
        }
        return arr;
    }

    moveLeft(step, board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (last[0] == -1 && my == last[1]) {
                return [board, extraShape, treasure, players];
            }
        }

        for (let i = 0; i < board.length; i++) {
            board[mx + i - board.length][my].x -= step;
        }
        extraShape.x -= step;

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].j == my) {
                treasure[i].x -= step;
            }
        }
        for (let i = 0; i < players.length; i++) {
            if (players[i].j == my) {
                players[i].x -= step;
            }
        }
        return [board, extraShape, treasure, players];
    }

    moveRight(step, board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (last[0] == 7 && my == last[1]) {
                return [board, extraShape, treasure, players];
            }
        }

        for (let i = 0; i < board.length; i++) {
            board[mx + 1 + i][my].x += step;
        }
        extraShape.x += step;

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].j == my) {
                treasure[i].x += step;
            }
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i].j == my) {
                players[i].x += step;
            }
        }
        return [board, extraShape, treasure, players];
    }

    moveDown(step, board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (mx == last[0] && last[1] == 7) {
                return [board, extraShape, treasure, players];
            }
        }

        for (let i = 0; i < board.length; i++) {
            board[mx][my + 1 + i].y += step;
        }
        extraShape.y += step;

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].i == mx) {
                treasure[i].y += step;
            }
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i].i == mx) {
                players[i].y += step;
            }
        }

        return [board, extraShape, treasure, players];
    }

    moveUp(step, board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (mx == last[0] && last[1] == -1) {
                return [board, extraShape, treasure, players];
            }
        }

        for (let i = 0; i < board.length; i++) {
            board[mx][my - board.length + i].y -= step;
        }
        extraShape.y -= step;

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].i == mx) {
                treasure[i].y -= step;
            }
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i].i == mx) {
                players[i].y -= step;
            }
        }

        return [board, extraShape, treasure, players];
    }

    shiftLeft(board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (last[0] == -1 && my == last[1]) {
                return [board, extraShape, treasure, players, last, false];
            }
        }

        let temp = board[mx - board.length][my];
        for (let i = 0; i < board.length - 1; i++) {
            board[mx - board.length + i][my] = board[mx - board.length + i + 1][my];
            board[mx - board.length + i][my].updatePos(mx - board.length + i, my);
        }
        board[mx - 1][my] = extraShape;
        board[mx - 1][my].updatePos(mx - 1, my);
        extraShape = temp;
        extraShape.updatePos(mx, my);

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].j == my) {
                treasure[i].i -= 1;
                if (treasure[i].i < 0) {
                    treasure[i].updatePos(mx, my);
                }
                treasure[i].onextra = treasure[i].i == mx && treasure[i].j == my;
            }
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i].j == my) {
                players[i].i -= 1;
                if (players[i].i < 0) {
                    players[i].updatePos(mx-1, my);
                }
            }
        }
        last = [mx, my];

        return [board, extraShape, treasure, players, last, true];
    }

    shiftRight(board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (last[0] == 7 && my == last[1]) {
                return [board, extraShape, treasure, players, last, false];
            }
        }

        let temp = board[mx + board.length][my];
        for (let i = board.length - 1; i > 0; i--) {
            board[mx + i + 1][my] = board[mx + i][my];
            board[mx + i + 1][my].updatePos(mx + i + 1, my);
        }
        board[mx + 1][my] = extraShape;
        board[mx + 1][my].updatePos(mx + 1, my);
        extraShape = temp;
        extraShape.updatePos(mx, my);

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].j == my) {
                treasure[i].i += 1;
                if (treasure[i].i > 6) {
                    treasure[i].updatePos(mx, my);
                }
                treasure[i].onextra = treasure[i].i == mx && treasure[i].j == my;
            }
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i].j == my) {
                players[i].i += 1;
                if (players[i].i > 6) {
                    players[i].updatePos(mx+1, my);
                }
            }
        }
        last = [mx, my];

        return [board, extraShape, treasure, players, last, true];
    }

    shiftDown(board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (mx == last[0] && last[1] == 7) {
                return [board, extraShape, treasure, players, last, false];
            }
        }

        let temp = board[mx][my + board.length];
        for (let i = board.length - 1; i > 0; i--) {
            board[mx][my + i + 1] = board[mx][my + i];
            board[mx][my + i + 1].updatePos(mx, my + i + 1);
        }
        board[mx][my + 1] = extraShape;
        board[mx][my + 1].updatePos(mx, my + 1);
        extraShape = temp;
        extraShape.updatePos(mx, my);

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].i == mx) {
                treasure[i].j += 1;
                if (treasure[i].j > 6) {
                    treasure[i].updatePos(mx, my);
                }
                treasure[i].onextra = treasure[i].i == mx && treasure[i].j == my;
            }
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i].i == mx) {
                players[i].j += 1;
                if (players[i].j > 6) {
                    players[i].updatePos(mx, my+1);
                }
            }
        }
        last = [mx, my];

        return [board, extraShape, treasure, players, last, true];
    }

    shiftUp(board, mx, my, extraShape, treasure, players, last) {
        if (last != undefined) {
            if (mx == last[0] && last[1] == -1) {
                return [board, extraShape, treasure, players, last, false];
            }
        }

        let temp = board[mx][my - board.length];
        for (let i = 0; i < board.length; i++) {
            board[mx][my - board.length + i - 1] = board[mx][my - board.length + i];
            board[mx][my - board.length + i - 1].updatePos(mx, my - board.length + i - 1);
        }
        board[mx][my - 1] = extraShape;
        board[mx][my - 1].updatePos(mx, my - 1);
        extraShape = temp;
        extraShape.updatePos(mx, my);

        for (let i = 0; i < treasure.length; i++) {
            if (treasure[i].i == mx) {
                treasure[i].j -= 1;
                if (treasure[i].j < 0) {
                    treasure[i].updatePos(mx, my);
                }
                treasure[i].onextra = treasure[i].i == mx && treasure[i].j == my;
            }
        }

        for (let i = 0; i < players.length; i++) {
            if (players[i].i == mx) {
                players[i].j -= 1;
                if (players[i].j < 0) {
                    players[i].updatePos(mx, my-1);
                }
            }
        }
        last = [mx, my];

        return [board, extraShape, treasure, players, last, true];
    }

    showPath(from) {
        let from_i = from[0];
        let from_j = from[1];

        let currentCell = this.board[from_i][from_j];
        currentCell.updateColor("lightgreen");

        let right, left, up, down;
        if (from_i < 6) right = this.board[from_i+1][from_j];
        if (from_i > 0) left = this.board[from_i-1][from_j];
        if (from_j < 6) down = this.board[from_i][from_j+1];
        if (from_j > 0) up = this.board[from_i][from_j-1];

        if (right != undefined && currentCell.facing.includes("RIGHT") && right.facing.includes("LEFT") && right.getColor() != "lightgreen") {
            this.showPath([from_i+1, from_j]);
        }
        if (left != undefined && currentCell.facing.includes("LEFT") && left.facing.includes("RIGHT") && left.getColor() != "lightgreen") {
            this.showPath([from_i-1, from_j]);
        }
        if (down != undefined && currentCell.facing.includes("DOWN") && down.facing.includes("UP") && down.getColor() != "lightgreen") {
            this.showPath([from_i, from_j+1]);
        }
        if (up != undefined && currentCell.facing.includes("UP") && up.facing.includes("DOWN") && up.getColor() != "lightgreen") {
            this.showPath([from_i, from_j-1]);
        }
    }
}