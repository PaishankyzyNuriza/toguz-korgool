const getNumberByLetter = (letter) => {
  switch (letter) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return 0;
  }
};

const getLetterByNumber = (number) => {
  switch (number) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
    default:
      return "";
  }
};

const getLetterNumberInArray = (stringsArray) => {
  return stringsArray.find(
    (str) =>
      str === "one" ||
      str === "two" ||
      str === "three" ||
      str === "four" ||
      str === "five" ||
      str === "six" ||
      str === "seven" ||
      str === "eight" ||
      str === "nine"
  );
};

const removeFigures = (cell, figures) => {
  figures.forEach((figure) => {
    cell.removeChild(figure);
  });
};

const getTeamByCell = (cell) => {
  return cell.parentNode.className.includes("first") ? "first" : "second";
};

const disableCell = (cell) => {
  cell.classList.remove("active");
  cell.disabled = true;
};

const activeCell = (cell) => {
  cell.classList.add("active");
  cell.disabled = false;
};

const disableAllCells = () => {
  cells.forEach((cell) => {
    cell.disabled = true;
    cell.classList.remove("active");
  });
};

const getOpposingTeam = (team) => {
  return team === "first" ? "second" : "first";
};

const isTeamAceSeted = (team) => {
  return team === "first" ? isFirstTeamAceSeted : isSecondTeamAceSeted;
};
