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

export type BallCoords = {
  ycoord: number;
  xcoord: number;
  xvelocity: number;
  yvelocity: number;
};

export type Coords = {
  player1: number;
  player2: number;
  ball: BallCoords;
};
export type Score = { player1: number; player2: number };

export type Game = { coords: Coords; score: Score; started: boolean };

export type BoxCoords = {
  xlcoord: number;
  ytcoord: number;
  xrcoord: number;
  ybcoord: number;
};

const STEP_SIZE = 1;

export function getInitialState() {
  return {
    coords: {
      player1: 200,
      player2: 200,
      ball: {
        ycoord: -1,
        xcoord: -1,
        xvelocity: -1,
        yvelocity: -1,
      },
    },
    score: { player1: 0, player2: 0 },
    started: false,
  };
}

export function movePaddle(
  state: Game,
  paddle: "l" | "r",
  direction: "up" | "down" | "none"
) {
  const newState = structuredClone(state);
  if (direction !== "none") {
    if (paddle === "l") {
      newState.coords.player1 += direction === "up" ? STEP_SIZE : -STEP_SIZE;
    }
    if (paddle === "r") {
      newState.coords.player2 += direction === "up" ? STEP_SIZE : -STEP_SIZE;
    }
  }
  return newState;
}
export type CollisionPosition = Set<
  "t" | "r" | "b" | "l" | "tl" | "tr" | "br" | "bl"
>;
export type CollisionConditions = {
  position: CollisionPosition;
}; //possibly include velocity

function checkCollision(
  ball: BoxCoords,
  other: BoxCoords,
  location: "t" | "r" | "b" | "l" | "tl" | "tr" | "br" | "bl"
) {
  switch (location) {
    case "t":
      if (ball.ytcoord > other.ybcoord) {
      }
  }
}

// function checkCollisions(
//   ball: BoxCoords,
//   other: BoxCoords,
//   conditions: CollisionConditions
// ) {
//   conditions.position.forEach(() => {
//     if checkCollision()
//   });
// }

function identifyCollider(screencoords: BoxCoords) {}

function updateBallVelocity(
  state: Game,
  screencords: {
    lboxcoords: BoxCoords;
    rboxcoords: BoxCoords;
    ballcoords: BoxCoords;
    topwallcoords: BoxCoords;
    bottomwallcoords: BoxCoords;
  }
) {
  // const newVelocity =
}

function checkWin() {}

// export default Game;
