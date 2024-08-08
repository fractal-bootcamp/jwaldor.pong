import { useState } from "react";
import "../index.css";
import { Game, getInitialState, movePaddle } from "../game.ts";

// export type BallCoords = {
//   ycoord: number;
//   xcoord: number;
//   xvelocity: number;
//   yvelocity: number;
// };

// export type Coords = {
//   player1: number;
//   player2: number;
//   ball: BallCoords;
// };
// export type Score = { player1: number; player2: number };

// export type Game = { coords: Coords; score: Score; started: boolean };

function Stadium() {
  const [state, setState] = useState<Game>(getInitialState());
  const position2 = 70;

  addEventListener("keydown", (event: KeyboardEvent) => {
    console.log("key", event.key);
    if (event.key === "w") {
      setState(movePaddle(state, "l", "up"));
      // setPosition1();
    }
    if (event.key === "s") {
      setState(movePaddle(state, "l", "down"));
    }
    if (event.key === "ArrowUp") {
      setState(movePaddle(state, "r", "up"));
    }
    if (event.key === "ArrowDown") {
      setState(movePaddle(state, "r", "down"));
    }
  });
  console.log(state);
  const position_px = String(position2) + "px";
  // console.log(position_px);
  return (
    <>
      <div className="flex flex-col relative w-[80%] max-w-md min-h-screen bg-sky-950 h-30">
        <div className="absolute left-3 bottom-[400px] min-w-2 min-h-10 bg-white"></div>
        <div
          style={{ bottom: position_px }}
          className={`absolute right-3 min-w-2 min-h-10 bg-white`}
        ></div>
      </div>
    </>
  );
}

export default Stadium;
