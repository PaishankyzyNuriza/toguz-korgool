const cells = document.querySelectorAll(".cell");
const deskFirst = document.querySelector(".desk.first");
const deskSecond = document.querySelector(".desk.second");
const deskCenter = document.querySelector(".center");
const moveFigure = document.querySelector(".move__figure");
const firstBarrak = document.querySelector(".first .bill");
const secondBarrak = document.querySelector(".second .bill");
const modal = document.querySelector(".modal");
const figureElem = `<div class="figure"></div>`;
const aceElem = `<div class="figure trump"></div>`;

const moveTime = 500;
const initalFiguresCount = 9;
const billsToWin = initalFiguresCount * 8;
const aceFiguresCount = 3;
const oCell = 9;

let teamTurn = "first";
let firstBill = 0;
let secondBill = 0;
let forbiddenToAceCells = [oCell];
let isFirstTeamAceSeted = false;
let isSecondTeamAceSeted = false;
