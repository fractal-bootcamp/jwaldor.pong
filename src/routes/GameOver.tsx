import { motion } from "framer-motion";

function GameOver({ winner }: { winner: string }) {
  // useEffect(() => {
  //   //top barricade
  //   var c = document.getElementById("myCanvas");
  //   var ctx = c.getContext("2d");
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(200, 100);
  //   ctx.stroke();

  //   //bottom barricade
  // }, [gameState]);

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
      <motion.div
        key={"gameover_key"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col relative w-[448px] h-[581px] bg-sky-950 h-30 justify-between"
      ></motion.div>
    </>
  );
}

export default GameOver;

//String(gameState.coords.ball.ycoord)
//String(gameState.coords.ball.xcoord)
