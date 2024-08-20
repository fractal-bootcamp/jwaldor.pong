import "./App.css";
import Stadium from "./routes/Stadium";
import GameMode from "./routes/GameModes";
import Lobby from "./routes/Lobby";
import { useState, useEffect, useRef } from "react";
import { socket } from "./routes/socket";
import { Game, getInitialState, getNextState, SPEED } from "./game.ts";

export type ModeChoicesType = "human" | "AI" | "multiplayer";
type Orientation = "up" | "down" | "none";

const useSetInterval = (cb: Function, time: number, isMulti: boolean) => {
  const cbRef = useRef<Function>(() => {});
  useEffect(() => {
    cbRef.current = cb;
  });
  useEffect(() => {
    const interval = setInterval(() => cbRef.current(), time);
    return () => clearInterval(interval);
  }, [time, isMulti]);
};

function App() {
  const [mode, setMode] = useState<ModeChoicesType>("human");
  const [isMulti, setIsMulti] = useState<boolean>(false);
  const [userList, setUserList] = useState([""]); //i think the user list is unneccessary now but i might start naming users again later and use the names to display the rooms
  const [gameList, setGameList] = useState<Array<string>>([]);
  const [gameState, setGameState] = useState<Game>(getInitialState());
  const [orientationLeft, setOrientationLeft] = useState<Orientation>("none");
  const [orientationRight, setOrientationRight] = useState<Orientation>("none");
  const [room, setRoom] = useState<string | undefined>();
  const [showlobby, setShowLobby] = useState<boolean>(false);

  function handleMode(choice: ModeChoicesType) {
    console.log("choice", choice);
    setMode(choice);
    setIsMulti(choice === "multiplayer");
  }
  function makeMultiplayer() {
    setMode("multiplayer");
    setIsMulti(true);
  }

  useEffect(() => {
    // const page_width = document.getElementById("background")?.clientWidth;
    // const page_height = document.getElementById("background")?.clientHeight;
    // console.log(page_width, page_height);

    function changeGameState(newState: Game) {
      console.log("getting new state");
      setGameState(newState);
    }
    function onUserListChange(newUserList: Array<string>) {
      setUserList(newUserList);
      console.log(userList);
    }
    function onGameListChange(newGameList: Array<String>) {
      console.log("newgamelist");
      console.log(newGameList, "newgamelist");
      setGameList(newGameList as Array<string>);
    }
    socket.on("newstate", changeGameState);
    socket.on("newuser", onUserListChange);
    socket.on("gamelist", onGameListChange);
    socket.on("test", (stuff) => {
      console.log(stuff);
    });

    return () => {
      socket.removeAllListeners();
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
    SPEED,
    isMulti
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

    if (!isMulti) {
      addEventListener("keydown", keydownListener);
      addEventListener("keyup", keyupListener);
    }

    return () => {
      if (isMulti) {
        removeEventListener("keydown", keydownListener);
        removeEventListener("keyup", keyupListener);
      }
    };
  }, [isMulti]);

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
    if (isMulti) {
      addEventListener("keydown", keydownListener);
      addEventListener("keyup", keyupListener);
    }

    return () => {
      if (!isMulti) {
        removeEventListener("keydown", keydownListener);
        removeEventListener("keyup", keyupListener);
      }
    };
  }, [isMulti]);

  // <Board/ >
  return (
    <>
      <div className="text-gray-200 flex flex-row">Hello</div>
      {/* <Start handleMode={handleMode} /> */}
      <GameMode
        handleMode={handleMode}
        handleLobby={() => {
          setShowLobby(!showlobby);
        }}
      />
      {!showlobby && <Stadium mode={mode} gameState={gameState} />}
      {showlobby && (
        <Lobby
          room={room}
          setRoom={setRoom}
          gameList={gameList}
          makeMultiplayer={makeMultiplayer}
        />
      )}
    </>
  );
}

export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// export default function App() {
//   return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
// }
