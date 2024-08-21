import { useEffect } from "react";

import { Game } from "../../game";
import { socket } from "../socket";

export const MultiState = ({
  setGameState,
}: // setUserList,
// setGameList,
{
  setGameState: Function;
  // setUserList: Function;
  // setGameList: Function;
}) => {
  useEffect(() => {
    // const page_width = document.getElementById("background")?.clientWidth;
    // const page_height = document.getElementById("background")?.clientHeight;
    // console.log(page_width, page_height);

    function changeGameState(newState: Game) {
      console.log("getting new state");
      setGameState(newState);
    }
    socket.on("newstate", changeGameState);

    return () => {
      socket.removeListener("newstate");
    };
  }, []);

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      if (event.key === "w") {
        socket.emit("moveup");
        // setPosition1();
      }
      if (event.key === "s") {
        socket.emit("movedown");
      }
      if (event.key === "ArrowUp") {
        socket.emit("moveup");
      }
      if (event.key === "ArrowDown") {
        socket.emit("movedown");
      }
    };

    const keyupListener = (event: KeyboardEvent) => {
      if (["w", "s"].includes(event.key)) {
        socket.emit("movenone");
        // setPosition1();
      }
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        socket.emit("movenone");
      }
    };
    addEventListener("keydown", keydownListener);
    addEventListener("keyup", keyupListener);

    return () => {
      removeEventListener("keydown", keydownListener);
      removeEventListener("keyup", keyupListener);
    };
  }, []);
  return <></>;
};
