// type Game = { cells: Cells; going: "x" | "o" };
// type Move = "" | "x" | "o";
// type Cells = [Move, Move, Move, Move, Move, Move, Move, Move, Move]; //9
// type EndState = {over: boolean, winner: "x" | "o" | "draw"}

// const initialGame: Game = { cells: Array(9).fill("") as Cells };

// const makeMove = (cellnumber: number, state: Game): Game | undefined => {
//   const newState = structuredClone(state);
//   if (newState.cells[cellnumber] !== "") {
//     console.error("can't do that");
//     return;
//   } else {
//     newState.cells[cellnumber] = newState.going;
//     return newState;
//   }
// };

// const calculateGameStatus = (state:Game): EndState => {

// }

type BallCoords = 
{  ycoord: number;
  xcoord: number;
  xvelocity: number;
  yvelocity: number;}

type Coords = {
  player1: number;
  player2: number;
  ball: BallCoords
  
};
type Score = { player1: number; player2: number };

type Game = { coords: Coords; score: Score };

type BoxCoords = {
  xllcoord: number;
  yllcoord: number;
  xtrcoord: number;
  ytrcoord: number;
};

const STEP_SIZE = 1;

function movePaddle(
  state: Game,
  paddle: number,
  direction: "up" | "down" | "none"
) {
  const newState = structuredClone(state);
  if (direction !== "none") {
    newState.coords.player1 += direction === "up" ? STEP_SIZE : -STEP_SIZE;
  }
  return newState;
}

function collisionComputer(box:BoxCoords,ball:BallCoords){

}

function updateBallVelocity(
  state: Game,
  lboxcoords: BoxCoords,
  rboxcoords: BoxCoords
) {
  const newVelocity = 
}

function checkWin() {}

export default Game;
