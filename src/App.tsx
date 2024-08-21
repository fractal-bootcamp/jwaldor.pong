import "./App.css";
import Stadium from "./routes/Stadium";
import GameMode from "./routes/GameModes";
import Lobby from "./routes/Lobby";
import { useState, useEffect, useRef } from "react";
import { socket } from "./routes/socket";
import { Game, getInitialState, getNextState, SPEED } from "./game.ts";
import { AnimatePresence } from "framer-motion";
import { SingleState } from "./routes/StateHelpers/SingleState.tsx";
import { MultiState } from "./routes/StateHelpers/MultiState.tsx";

export type ModeChoicesType = "human" | "AI" | "multiplayer" | "ended";
export type Orientation = "up" | "down" | "none";

function App() {
  const [mode, setMode] = useState<ModeChoicesType>("human");
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
  }

  function resetRemoteScore() {}
  // function resetRoom(choice: string) {
  //   console.log("choice", choice);
  //   setMode(choice);
  //   setIsMulti(choice === "multiplayer");
  // }

  function leaveRoom() {
    console.log("choice", choice);
    setMode("human");
  }

  // <Board/ >
  return (
    <>
      <div className="text-gray-200 flex flex-row">Hello</div>
      {mode !== "multiplayer" && (
        <SingleState
          setGameState={setGameState}
          setOrientationLeft={setOrientationLeft}
          setOrientationRight={setOrientationRight}
          orientationLeft={orientationLeft}
          orientationRight={orientationRight}
          mode={mode}
        />
      )}
      {mode === "multiplayer" && (
        <MultiState
          setGameState={setGameState}
          setGameList={setGameList}
          setUserList={setUserList}
        />
      )}
      {/* <Start handleMode={handleMode} /> */}
      {
        <GameMode
          handleMode={handleMode}
          handleLobby={() => {
            setShowLobby(!showlobby);
          }}
        />
      }

      <AnimatePresence>
        {!showlobby && <Stadium mode={mode} gameState={gameState} />}
        {showlobby && (
          <Lobby
            room={room}
            setRoom={setRoom}
            gameList={gameList}
            makeMultiplayer={() => handleMode("multiplayer")}
          />
        )}
      </AnimatePresence>
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
