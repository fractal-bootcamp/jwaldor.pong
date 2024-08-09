import { useState } from "react";
import "./App.css";
import Start from "./routes/Start";
import Stadium from "./routes/Stadium";

function App() {
  const [mode, setMode] = useState("");

  console.log("Hello world");
  function handleMode(choice: string) {
    console.log("choice", choice);
    setMode(choice);
  }
  // <Board/ >
  return (
    <>
      <div className="text-gray-200">Hello</div>
      {/* <Start handleMode={handleMode} /> */}
      <Stadium />
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
