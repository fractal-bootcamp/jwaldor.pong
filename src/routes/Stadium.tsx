import "../index.css";
import {
  Game,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_LEFT,
  PADDLE_RIGHT,
  BALL_SIZE,
} from "../game.ts";
import { ModeChoicesType } from "../App.tsx";

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

type StadiumProps = { mode: ModeChoicesType; gameState: Game };

// type AIType = "human" | "AI";

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

function Stadium({ gameState }: StadiumProps) {
  // const [mode, setMode] = useState<AIType>("human");
  // const [userName, setUserName] = useState("");

  // const [userList, setUserList] = useState([""]);
  // const [gameList, setGameList] = useState<Array<string>>([]);
  // const [gameState, setGameState] = useState<Game>(getInitialState());

  // console.log(gameState);
  // const position_px = String(position2) + "px";
  // console.log(position_px);

  //min-w-2 min-h-10
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
          {/* <div className="flex flex-row justify-between">
            <button className={buttonStyle} onClick={() => handleMode("human")}>
              Human v. Human
            </button>
            <button className={buttonStyle} onClick={() => handleMode("AI")}>
              Human v. AI
            </button>
          </div> */}
        </div>
      </div>
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
      </>
    </>
  );
}

export default Stadium;

//String(gameState.coords.ball.ycoord)
//String(gameState.coords.ball.xcoord)
