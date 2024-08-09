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
  ybcoord: number;
};

const STEP_SIZE = 5;
export const SPEED = 30;

export const PADDLE_WIDTH = 8;
export const PADDLE_HEIGHT = 45;
export const PADDLE_LEFT = 10;
export const PADDLE_RIGHT = 10;
export const BALL_SIZE = 10;

export const BALL_START_X = 300;
export const BALL_START_Y = 300;

export function getInitialState() {
  return {
    coords: {
      player1: 200,
      player2: 200,
      ball: {
        ycoord: 200,
        xcoord: 350,
        xvelocity: 3,
        yvelocity: 3,
      },
    },
    score: { player1: 0, player2: 0 },
    started: false,
  };
}

type Orientation = "up" | "down" | "none";

let callCount = 0;
let paddlecallCount = 0;
let ballCallCount = 0;

export function getNextState(
  state: Game,
  orientationLeft: Orientation,
  orientationRight: Orientation
): Game {
  // console.log(state, orientationLeft, orientationRight);
  // move right paddle
  // move the left paddle
  // move the ball
  // check if win
  callCount += 1;
  // console.log("callCounts", callCount, paddlecallCount, ballCallCount);
  const newState = structuredClone(state);
  const state1 = movePaddle(state, "l", orientationLeft);
  const state2 = movePaddle(state1, "r", orientationRight);
  // console.log(orientationRight);
  const state3 = moveBall(state2);
  const state4 = updateBallVelocity(state3);
  const state5 = checkWin(state4);
  return state5;
}

export function movePaddle(
  state: Game,
  paddle: "l" | "r",
  direction: Orientation
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

export function moveBall(state: Game) {
  const newState = structuredClone(state);
  newState.coords.ball.xcoord += newState.coords.ball.xvelocity;
  newState.coords.ball.ycoord += newState.coords.ball.yvelocity;
  return newState;
}

export type CollisionPosition = Set<
  "t" | "r" | "b" | "l" | "tl" | "tr" | "br" | "bl"
>;
export type CollisionConditions = {
  position: CollisionPosition;
}; //possibly include velocity

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

function computeCoordinates() {}

type FullCoords = {
  lx: number;
  rx: number;
  ty: number;
  by: number;
};

function checkCollision(ballcoords: FullCoords, paddleCoords: FullCoords) {
  return (
    ballcoords.lx < paddleCoords.rx &&
    ballcoords.rx > paddleCoords.lx &&
    ballcoords.by < paddleCoords.ty &&
    ballcoords.ty > paddleCoords.by
  );
}

function paddleCollision(
  ballcoords: FullCoords,
  paddleCoords: FullCoords,
  gameState: Game,
  whichpaddle: "left" | "right"
) {
  const ballx = gameState.coords.ball.xvelocity;
  const bally = gameState.coords.ball.yvelocity;
  const paddleheight = paddleCoords.ty - paddleCoords.by;
  const ballcenter =
    ((ballcoords.ty - ballcoords.by) / 2 +
      ballcoords.by -
      (paddleCoords.ty + paddleCoords.by) / 2) /
    paddleheight;
  const newAngle = Math.atan(-bally / ballx + ballcenter);
  gameState.coords.ball.xvelocity = -Math.cos(newAngle) * ballx;
  gameState.coords.ball.yvelocity = Math.sin(newAngle) * bally;
  console.log("xcoord", gameState.coords.ball.xcoord, paddleCoords.lx);
  if (whichpaddle === "left") {
    gameState.coords.ball.xcoord = paddleCoords.rx + BALL_SIZE;
  } else if (whichpaddle === "right") {
    gameState.coords.ball.xcoord = paddleCoords.lx - BALL_SIZE;
  }
  console.log(gameState.coords.ball.xvelocity, gameState.coords.ball.yvelocity);
  return gameState;
}

function updateBallVelocity(state: Game) {
  const page_width = document.getElementById("background")?.clientWidth;
  const page_height = document.getElementById("background")?.clientHeight;
  if (page_width && page_height) {
    const leftpad = {
      lx: PADDLE_LEFT,
      rx: PADDLE_LEFT + PADDLE_WIDTH,
      ty: state.coords.player1 + PADDLE_HEIGHT,
      by: state.coords.player1,
    };

    const rightpad = {
      lx: page_width - PADDLE_RIGHT,
      rx: page_width - PADDLE_RIGHT - PADDLE_WIDTH,
      ty: state.coords.player2 + PADDLE_HEIGHT,
      by: state.coords.player2,
    };

    const ball = {
      lx: state.coords.ball.xcoord,
      rx: state.coords.ball.xcoord + BALL_SIZE,
      ty: state.coords.ball.ycoord + BALL_SIZE,
      by: state.coords.ball.ycoord,
    };
    console.log(ball.by);
    const bottomwall = page_height;
    const topwall = document
      .getElementById("topwall")
      ?.getBoundingClientRect().bottom;
    console.log("walls", bottomwall, topwall, page_height - 40);
    // console.log(leftpad, rightpad, ball);
    if (checkCollision(ball, rightpad)) {
      console.log("collision detected");
      return paddleCollision(ball, rightpad, state, "right");
    } else if (checkCollision(ball, leftpad)) {
      console.log("collision detected");
      return paddleCollision(ball, leftpad, state, "left");
    }
    if (ball.ty > page_height - 40) {
      console.log(ball.ty, topwall, "hitting bototm");
      state.coords.ball.yvelocity = -state.coords.ball.yvelocity;
      return state;
    } else if (ball.by < 40) {
      console.log("hitting top");
      state.coords.ball.yvelocity = -state.coords.ball.yvelocity;
      return state;
    } else {
      return state;
    }
  } else {
    console.log("error with document");
    return state;
  }

  // document.getElementById("background")?.clientWidth;
}

// const newVelocity =

function checkWin(gameState: Game) {
  const page_width = document.getElementById("background")?.clientWidth;
  if (page_width) {
    if (gameState.coords.ball.xcoord > page_width) {
      gameState.coords.ball.xcoord = BALL_START_X;
      gameState.coords.ball.ycoord = BALL_START_Y;
      gameState.score.player1 += 1;
      return gameState;
    } else if (gameState.coords.ball.xcoord < 0) {
      gameState.coords.ball.xcoord = BALL_START_X;
      gameState.coords.ball.ycoord = BALL_START_Y;
      gameState.score.player2 += 1;
      return gameState;
    } else {
      return gameState;
    }
  } else {
    return gameState;
    console.log("page width null");
  }
}

// export default Game;
