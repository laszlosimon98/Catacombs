let c;
let game_over = false;
let end = false;

const can = document.querySelector(".can");
const canvas = document.querySelector("canvas");

const startDiv = document.querySelector(".starting");
const rule = document.querySelector("#rule");

const startBtn = document.querySelector("#start");
const descriptionBtn = document.querySelector("#description");
const closeBtn = document.querySelector("#close");
const backBtn = document.querySelector("#back");

const playerNumber = document.querySelector("#playerNumber");
const treasureNumber = document.querySelector("#treasureNumber");
let currentMax = (24 / playerNumber.value);

can.style.display = "none";
canvas.style.display = "none";
rule.style.display = "none";
backBtn.style.display = "none";

playerNumber.addEventListener("input", () => {
    if (playerNumber.value > 4) {
        playerNumber.value = 4;
    } else if (playerNumber.value < 1) {
        playerNumber.value = 1;
    }
    currentMax = (24 / playerNumber.value);
})

treasureNumber.addEventListener("input", () => {
    if (treasureNumber.value > 24) {
        treasureNumber.value = 24;
    } else if (treasureNumber.value < 1) {
        treasureNumber.value= 1;
    }

    currentMax = (24 / playerNumber.value);
    treasureNumber.max = currentMax;
})

startBtn.addEventListener("click", () => {
    can.style.display = "block";
    canvas.style.display = "block";
    startDiv.style.display = "none";
    rule.style.display = "none";
    backBtn.style.display = "block";

    if (treasureNumber.value > currentMax) {
        treasureNumber.value = currentMax;
        treasureNumber.max = currentMax;
    }

    let treasures = treasureNumber.value * playerNumber.value;

    c = new Catacombs(800, 600, playerNumber.value, treasures);
    let t;
    c.init();

    t = setInterval(() => {
        c.mainloop();
        if (game_over) {
            canvas.style.display = "none";
            can.style.display = "none";
            startDiv.style.display = "block";
            backBtn.style.display = "none";
            delete c;
            game_over = false;
            clearInterval(t);
        }
    }, 10);
})

descriptionBtn.addEventListener("click", () => {
    rule.style.display = "block";
    startDiv.style.display = "none";
})

closeBtn.addEventListener("click", () => {
    rule.style.display = "none";
    startDiv.style.display = "block";
})

backBtn.addEventListener("click", () => {
    can.style.display = "none";
    canvas.style.display = "none";
    rule.style.display = "none";
    startDiv.style.display = "block";
    backBtn.style.display = "none";

    delete c;
})