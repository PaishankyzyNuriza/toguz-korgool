function defineWinner(team) {
  const text = modal.querySelector("span");
  modal.classList.add("active");

  if (team === "first") text.innerText = "The first team has winned!";
  else if (team === "second") text.innerText = "The second team has winned!";
}

function defineTurnAndCellsEmptiness(isChangeTurn = true) {
  if (isChangeTurn) teamTurn = teamTurn === "first" ? "second" : "first";
  let firstTeamEmptyCells = 0;
  let secondTeamEmptyCells = 0;

  cells.forEach((cell) => {
    const isAceInCell = cell.querySelector(".trump")
    const team = getTeamByCell(cell);

    if (team === "first") {
      !cell.querySelectorAll(".figure").length && firstTeamEmptyCells++;
    } else if (team === "second") {
      !cell.querySelectorAll(".figure").length && secondTeamEmptyCells++;
    }

    if (team !== teamTurn || isAceInCell) {
      disableCell(cell);
    } else if (cell.querySelectorAll(".figure").length) {
      activeCell(cell);
    }
  });

  if (firstTeamEmptyCells >= 9) defineWinner("second");
  else if (secondTeamEmptyCells >= 9) defineWinner("first");
}

function distributeFigures(startNumber, figuresCount, startTeam) {
  let i = figuresCount;
  let isEven = false;
  let isAce = false;
  let currPos = {
    number: figuresCount > 1 ? startNumber - 1 : startNumber,
    team: startTeam,
  };

  moveFigure.style.opacity = 1;

  return new Promise((resolve) => {
    setTimeout(function distribute() {
      i--;

      if (currPos.number < 9) currPos.number++;
      else {
        currPos.number = 1;
        currPos.team = currPos.team === "first" ? "second" : "first";
      }

      const currentCell = document.querySelector(
        `.${currPos.team} .cell.${getLetterByNumber(currPos.number)}`
      );
      currentCell.innerHTML += figureElem;

      moveFigure.innerText = i;
      moveFigure.style.top =
        currentCell.offsetTop + currentCell.offsetHeight / 2 - 15 / 2 + "px";
      moveFigure.style.left =
        currPos.team === "first"
          ? deskSecond.offsetWidth + deskCenter.offsetWidth - 30 + "px"
          : deskSecond.offsetWidth + "px";

      if (!i) {
        const lastCellFiguresCount =
          currentCell.querySelectorAll(".figure").length;

        moveFigure.style.opacity = 0;
        if (!(lastCellFiguresCount % 2)) isEven = true;
        else if (
          lastCellFiguresCount === aceFiguresCount &&
          !forbiddenToAceCells.includes(currPos.number)
        )
          isAce = true;
        resolve({
          isEven,
          lastCell: currentCell,
          lastDeskTeam: currPos.team,
          isAce,
        });
      } else setTimeout(distribute, moveTime);
    });
  });
}

function saveFiguresInBarracks(cell, team) {
  const figures = cell.querySelectorAll(".figure:not(.trump)");
  const firstBillElem = document.querySelector(".first .bill .count");
  const secondBillElem = document.querySelector(".second .bill .count");
  let winnerBarrak;

  if (team === "first") {
    winnerBarrak = firstBarrak;
    firstBill += figures.length;
    firstBillElem.innerText = firstBill;
  } else if (team === "second") {
    winnerBarrak = secondBarrak;
    secondBill += figures.length;
    secondBillElem.innerText = secondBill;
  }

  removeFigures(cell, figures);
  for (let i = 0; i < figures.length; i++) {
    const figuresInWinnerBarak = winnerBarrak.querySelectorAll(".figure");
    if (figuresInWinnerBarak.length < 36) winnerBarrak.innerHTML += figureElem;
  }
}

function checkIsWin() {
  if (firstBill >= billsToWin) {
    defineWinner("first");
    return true;
  } else if (secondBill >= billsToWin) {
    defineWinner("second");
    return true;
  }
}

function setAce(team, cell) {
  const setedNumber = getNumberByLetter(
    getLetterNumberInArray(cell.className.split(" "))
  );

  document.querySelector(`.center .${team} .trump.figure`).remove();
  cell.innerHTML += aceElem;

  if (team === "first") isFirstTeamAceSeted = true;
  else if (team === "second") isSecondTeamAceSeted = true;
  forbiddenToAceCells.push(setedNumber);
}

function takeFiguresWithAce() {
  const aces = document.querySelectorAll(".desk .trump");

  aces.forEach((ace) => {
    const aceCell = ace.parentNode;
    const aceTeam = getOpposingTeam(getTeamByCell(aceCell));
    const figures = aceCell.querySelectorAll(".figure:not(.trump)");

    if (figures.length) {
      saveFiguresInBarracks(aceCell, aceTeam);
    }
  });
}

async function move(currentCell) {
  const team = `.${getTeamByCell(currentCell)}`;
  const cellNumber = getLetterNumberInArray(currentCell.className.split(" "));
  const currentFigures = currentCell.querySelectorAll(".figure");

  disableAllCells();
  removeFigures(currentCell, currentFigures);

  const {
    isEven: isLactCellEven,
    lastCell,
    lastDeskTeam,
    isAce: isLactCellAce,
  } = await distributeFigures(
    getNumberByLetter(cellNumber),
    currentFigures.length,
    team.replace(".", "")
  );

  if (
    (isLactCellEven || (isLactCellAce && !isTeamAceSeted(teamTurn))) &&
    lastDeskTeam !== teamTurn
  ) {
    saveFiguresInBarracks(lastCell, teamTurn);
    isLactCellAce && setAce(teamTurn, lastCell);
  }

  (isFirstTeamAceSeted || isSecondTeamAceSeted) && takeFiguresWithAce();

  if (checkIsWin()) return;
  defineTurnAndCellsEmptiness();
}

function startGame() {
  const onClickCell = (event) => {
    move(event.target);
  };

  cells.forEach((cell) => {
    cell.classList.add("active");
    cell.addEventListener("click", onClickCell);
    for (let i = 0; i < initalFiguresCount; i++) {
      cell.innerHTML += figureElem;
    }
  });

  defineTurnAndCellsEmptiness(false);
}

startGame();
