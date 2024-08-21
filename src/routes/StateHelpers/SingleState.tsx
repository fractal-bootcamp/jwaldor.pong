import { useEffect, useRef } from "react";
import { SPEED } from "../../game";
import { Orientation } from "../../App";
import { getNextState } from "../../game";
import { ModeChoicesType } from "../../App";

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

export const SingleState = ({
  setGameState,
  setOrientationLeft,
  setOrientationRight,
  orientationLeft,
  orientationRight,
  mode,
}: {
  setGameState: Function;
  setOrientationLeft: Function;
  setOrientationRight: Function;
  orientationLeft: Orientation;
  orientationRight: Orientation;
  mode: ModeChoicesType;
}) => {
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

  useSetInterval(
    () =>
      setGameState((prev) => {
        // console.log("prev", prev);
        const newState = getNextState(
          prev,
          orientationLeft,
          orientationRight,
          mode
        );
        // console.log("newState", newState);

        return newState;
      }),
    SPEED
  );
  return <></>;
};
