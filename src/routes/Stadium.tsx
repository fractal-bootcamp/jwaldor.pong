import { ChangeEvent, useEffect, useRef, useState } from "react";
import "../index.css";
import {
  Game,
  getInitialState,
  getNextState,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_LEFT,
  PADDLE_RIGHT,
  SPEED,
  BALL_SIZE,
} from "../game.ts";
import { io } from "socket.io-client";
import * as dotenv from "dotenv";
import { socket } from "./socket";
import { registerUser, listUsers, testFunction } from "../services.ts";

// dotenv.config();

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

type AIType = "human" | "AI";

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

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

function Stadium() {
  const [gameState, setGameState] = useState<Game>(getInitialState());
  const [orientationLeft, setOrientationLeft] = useState<Orientation>("none");
  const [orientationRight, setOrientationRight] = useState<Orientation>("none");
  const [mode, setMode] = useState<AIType>("human");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [isMulti, setIsMulti] = useState(true);
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState([""]);
  const [gameList, setGameList] = useState<Array<string>>([]);
  const [room, setRoom] = useState<string | undefined>();

  useEffect(() => {
    const page_width = document.getElementById("background")?.clientWidth;
    const page_height = document.getElementById("background")?.clientHeight;
    console.log(page_width, page_height);
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
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  if (!isMulti) {
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
  } else {
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
  }

  const initializeGame: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("creating room");
    const room = formData.get("room");
    console.log(formData);
    console.log("creating room", room, socket.id, "socket.id");
    socket.emit("joinroom", room);
  };

  const saveUserName: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (userName === "") {
      const formData = new FormData(event.currentTarget);
      console.log("title", formData.get("username"));
      const username = formData.get("username") as string;
      // registerUser(username);
      socket.emit("startaroom", username);
      console.log("adding user", username);
    } else {
      console.log("user name already set");
    }
  };

  function handleMode(choice: string) {
    console.log("choice", choice);
    setMode("AI");
  }
  // console.log(gameState);
  // const position_px = String(position2) + "px";
  // console.log(position_px);

  //min-w-2 min-h-10
  const buttonStyle =
    "border-secondary border text-red rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-secondary bg-green-950 hover:bg-[#E8FBF6] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5";
  // console.log("width", document.getElementById("background")?.clientWidth);
  // console.log(userList.filter((user) => user != userName));
  // console.log(userList, typeof userList);
  return (
    <>
      <div
        id="background"
        className="flex flex-col relative w-[448px] h-[581px] bg-sky-950 h-30 justify-between"
      >
        <div
          id="topwall"
          className=" bg-cyan-800 rounded-b-lg w-full h-[40px]"
        ></div>
        <div className="text-blue-100">{gameState.score.player1}</div>
        <div className="text-blue-100">{gameState.score.player2}</div>
        <div
          style={{
            bottom: String(gameState.coords.player1) + "px",
            width: String(PADDLE_WIDTH) + "px",
            height: String(PADDLE_HEIGHT) + "px",
            left: String(PADDLE_LEFT) + "px",
          }}
          className="absolute left-[10px] bg-white"
        ></div>
        {document.getElementById("background")?.clientWidth &&
        document.getElementById("background")?.clientHeight ? (
          <div
            style={{
              bottom: String(gameState.coords.ball.ycoord) + "px",
              left: String(gameState.coords.ball.xcoord) + "px",
              width: String(BALL_SIZE) + "px",
              height: String(BALL_SIZE) + "px",
            }}
            className={`absolute rounded bg-white`}
          ></div>
        ) : (
          <div></div>
        )}
        <div
          style={{
            bottom: String(gameState.coords.player2) + "px",
            width: String(PADDLE_WIDTH) + "px",
            height: String(PADDLE_HEIGHT) + "px",
            right: String(PADDLE_RIGHT) + "px",
          }}
          className={`absolute bg-white`}
        ></div>
        <div
          id="bottomwall"
          className=" bg-cyan-800 rounded-b-lg w-full h-[40px]"
        >
          {" "}
          <div className="flex flex-row justify-between">
            <button className={buttonStyle} onClick={() => handleMode("human")}>
              Human v. Human
            </button>
            <button className={buttonStyle} onClick={() => handleMode("AI")}>
              Human v. AI
            </button>
          </div>
        </div>
      </div>
      <p>State: {"" + isConnected}</p>;
      <>
        {/* <button
          onClick={() => {
            console.log("connect");
            socket.emit("moveup", "jacob");
            socket.connect();
          }}
        >
          Connect
        </button>
        <button onClick={() => socket.disconnect()}>Disconnect</button>
         */}

        {/* <div>Users</div>
        {listUsers().then((response) =>
          response.map((user: string) => {
            console.log(user);
            return <div>{user}</div>;
          })
        )} */}

        <div>Save new room</div>
        <form onSubmit={saveUserName}>
          <input name="username" type="text"></input>
          <button type="submit">Save</button>
        </form>
        <div>Join new room</div>
        {gameList.map((user: string) => (
          <div>{user}</div>
        ))}
        <form onSubmit={initializeGame}>
          <select name="room">
            {gameList
              .filter((user) => user !== userName)
              .map((user: string) => (
                <option value={user}>{user}</option>
              ))}
          </select>
          <button>Join room</button>
        </form>
      </>
    </>
  );
}

export default Stadium;

//String(gameState.coords.ball.ycoord)
//String(gameState.coords.ball.xcoord)
