import "./App.css";
import Stadium from "./routes/Stadium";
import GameMode from "./routes/GameModes";
import Lobby from "./routes/Lobby";
import { useState, useEffect } from "react";
import { socket } from "./routes/socket";
import { Game } from "./game";
import { getInitialState } from "./game";

export type ModeChoicesType = "human" | "AI" | "multiplayer";

function App() {
  const [mode, setMode] = useState<ModeChoicesType>("human");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [userList, setUserList] = useState([""]);
  const [gameList, setGameList] = useState<Array<string>>([]);
  const [gameState, setGameState] = useState<Game>(getInitialState());

  function handleMode(choice: ModeChoicesType) {
    console.log("choice", choice);
    setMode(choice);
  }
  console.log("Hello world");

  useEffect(() => {
    // const page_width = document.getElementById("background")?.clientWidth;
    // const page_height = document.getElementById("background")?.clientHeight;
    // console.log(page_width, page_height);
    function onConnect() {
      setIsConnected(true);
      // socket.join(userName)
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }
    function changeGameState(newState: Game) {
      console.log("getting new state");
      setGameState(newState);
    }
    function onUserListChange(newUserList) {
      setUserList(newUserList);
    }
    function onGameListChange(newGameList: Array<String>) {
      console.log("newgamelist");
      console.log(newGameList, "newgamelist");
      setGameList(newGameList as Array<string>);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
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

  // <Board/ >
  return (
    <>
      <div className="text-gray-200">Hello</div>
      {/* <Start handleMode={handleMode} /> */}
      <Stadium mode={mode} />
      <GameMode handleMode={handleMode} />
      <Lobby />
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
