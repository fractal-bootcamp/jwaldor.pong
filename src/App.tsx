import "./App.css";
import Stadium from "./routes/Stadium";
import GameMode from "./routes/GameModes";
import { useState } from "react";

export type ModeChoicesType = "human" | "AI" | "multiplayer";

function App() {
  const [mode, setMode] = useState<ModeChoicesType>("human");

  function handleMode(choice: ModeChoicesType) {
    console.log("choice", choice);
    setMode(choice);
  }
  console.log("Hello world");

  // <Board/ >
  return (
    <>
      <div className="text-gray-200">Hello</div>
      {/* <Start handleMode={handleMode} /> */}
      <Stadium mode={mode} />
      <GameMode handleMode={handleMode} />
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
