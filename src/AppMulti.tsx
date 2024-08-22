// import "./App.css";
// import Stadium from "./routes/Stadium.tsx";
// import GameMode from "./routes/GameModes.tsx";
// import Lobby from "./routes/Lobby.tsx";
// import { useState, useEffect } from "react";
// import { socket } from "./routes/socket.ts";
// import { Game, getInitialState } from "./game.ts";
// import { AnimatePresence } from "framer-motion";
// import { SingleState } from "./routes/StateHelpers/SingleState.tsx";
// import { MultiState } from "./routes/StateHelpers/MultiState.tsx";
// import { Route, useParams } from "react-router-dom";

// // import GameOver from "./routes/GameOver.tsx";

// export type ModeChoicesType = "human" | "AI" | "multiplayer" | "ended";
// export type Orientation = "up" | "down" | "none";

// function AppMulti() {
//   console.log("inmulti");
//   const params = useParams();
//   console.log("roomName", params.roomName);
//   const [mode, setMode] = useState<ModeChoicesType>("multiplayer");
//   // const [userList, setUserList] = useState([""]); //i think the user list is unneccessary now but i might start naming users again later and use the names to display the rooms
//   const [gameList, setGameList] = useState<Array<string>>([]);
//   const [gameState, setGameState] = useState<Game>(getInitialState());
//   const [orientationLeft, setOrientationLeft] = useState<Orientation>("none");
//   const [orientationRight, setOrientationRight] = useState<Orientation>("none");
//   const [room, setRoom] = useState<string | undefined>(params.roomName);
//   const [showlobby, setShowLobby] = useState<boolean>(false);

//   useEffect(() => {
//     // const page_width = document.getElementById("background")?.clientWidth;
//     // const page_height = document.getElementById("background")?.clientHeight;
//     // console.log(page_width, page_height);

//     // function onUserListChange(newUserList: Array<string>) {
//     //   setUserList(newUserList);
//     // }
//     function onGameListChange(newGameList: Array<String>) {
//       console.log("newgamelist");
//       console.log(newGameList, "newgamelist");
//       setGameList(newGameList as Array<string>);
//     }
//     // socket.on("newuser", onUserListChange);
//     socket.on("gamelist", onGameListChange);
//     socket.on("test", (stuff) => {
//       console.log(stuff);
//     });

//     return () => {
//       // socket.removeListener("newuser");
//       socket.removeListener("gamelist");
//       socket.removeListener("test");
//     };
//   }, []);

//   function handleMode(choice: ModeChoicesType) {
//     console.log("choice", choice);
//     setMode(choice);
//   }

//   // function resetRemoteScore() {}
//   // // function resetRoom(choice: string) {
//   // //   console.log("choice", choice);
//   // //   setMode(choice);
//   // //   setIsMulti(choice === "multiplayer");
//   // // }

//   // function leaveRoom() {
//   //   // console.log("choice", choice);
//   //   setMode("human");
//   // }

//   // <Board/ >
//   return (
//     <>
//       <div className="text-gray-200 flex flex-row">Hello</div>
//       {mode !== "multiplayer" && (
//         <SingleState
//           setGameState={setGameState}
//           setOrientationLeft={setOrientationLeft}
//           setOrientationRight={setOrientationRight}
//           orientationLeft={orientationLeft}
//           orientationRight={orientationRight}
//           mode={mode}
//         />
//       )}
//       {mode === "multiplayer" && (
//         <MultiState
//           setGameState={setGameState}
//           // setGameList={setGameList}
//           // setUserList={setUserList}
//         />
//       )}
//       {/* <Start handleMode={handleMode} /> */}
//       {
//         <GameMode
//           handleMode={handleMode}
//           handleLobby={() => {
//             setShowLobby(!showlobby);
//           }}
//           mode={mode}
//         />
//       }

//       <AnimatePresence>
//         {!showlobby && <Stadium mode={mode} gameState={gameState} />}
//         {showlobby && (
//           <Lobby
//             room={room}
//             setRoom={setRoom}
//             gameList={gameList}
//             makeMultiplayer={() => handleMode("multiplayer")}
//           />
//         )}
//       </AnimatePresence>
//       {/* <GameOver /> */}
//     </>
//   );
// }

// export default AppMulti;

// // import { useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// // import "./App.css";

// // export default function App() {
// //   return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
// // }
