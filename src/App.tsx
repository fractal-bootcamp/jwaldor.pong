import { useState } from "react";
import "./App.css";
import Start from "./routes/Start";
import Stadium from "./routes/Stadium";

function KeyPress() {
  const keyPress = (event: React.KeyboardEvent) => {
    console.log(event.key);
  };
  return (
    <div className="App">
      <h1>GeeksforGeeks</h1>
      <input type="text" onKeyPress={keyPress} placeholder="Press here..." />
    </div>
  );
}

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
      <KeyPress />
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
