import { useEffect, useRef, useState } from "react";
import "../index.css";
import {
  Game,
  getInitialState,
  getNextState,
  movePaddle,
  SPEED,
} from "../game.ts";

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

type Orientation = "up" | "down" | "none";

const useSetInterval = (cb: Function, time: number) => {
  const cbRef = useRef<Function>(() => {});
  useEffect(() => {
    cbRef.current = cb;
  });
  useEffect(() => {
    const interval = setInterval(() => cbRef.current(), time);
    return () => clearInterval(interval);
  }, [time]);
};

function Stadium() {
  const [gameState, setGameState] = useState<Game>(getInitialState());
  const [orientationLeft, setOrientationLeft] = useState<Orientation>("up");
  const [orientationRight, setOrientationRight] = useState<Orientation>("up");
  const position2 = gameState.coords.player2;

  useSetInterval(
    () =>
      setGameState((prev) => {
        // console.log("prev", prev);
        const newState = getNextState(prev, orientationLeft, orientationRight);
        // console.log("newState", newState);

        return newState;
      }),
    SPEED
  );

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      if (event.key === "w") {
        setOrientationLeft("up");
        // setPosition1();
      }
      if (event.key === "s") {
        setOrientationLeft("down");
      }
      if (event.key === "ArrowUp") {
        setOrientationRight("up");
      }
      if (event.key === "ArrowDown") {
        setOrientationRight("down");
      }
    };

    const keyupListener = (event: KeyboardEvent) => {
      if (["w", "s"].includes(event.key)) {
        setOrientationLeft("none");
        // setPosition1();
      }
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        setOrientationRight("none");
      }
    };

    addEventListener("keydown", keydownListener);
    addEventListener("keyup", keyupListener);

    return () => {
      removeEventListener("keydown", keydownListener);
      removeEventListener("keyup", keyupListener);
    };
  }, []);

  console.log(gameState);
  // const position_px = String(position2) + "px";
  // console.log(position_px);
  return (
    <>
      <div className="flex flex-col relative w-[80%] max-w-md min-h-screen bg-sky-950 h-30">
        <div
          style={{ bottom: String(gameState.coords.player1) + "px" }}
          className="absolute left-3 bottom-[400px] min-w-2 min-h-10 bg-white"
        ></div>
        <div
          style={{ bottom: String(gameState.coords.player2) + "px" }}
          className={`absolute right-3 min-w-2 min-h-10 bg-white`}
        ></div>
      </div>
    </>
  );
}

export default Stadium;
