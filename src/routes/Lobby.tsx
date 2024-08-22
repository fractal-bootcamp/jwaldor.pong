import { socket } from "./socket";
import { useState } from "react";
import { motion } from "framer-motion";
// import nav from "@preline/tabs";

function Lobby({
  initializeGame,
  gameList,
}: {
  initializeGame: Function;
  gameList: Array<string>;
}) {
  const [selectedInput, setSelectedInput] = useState<string | undefined>();

  // useEffect(() => {
  //   document.addEventListener("click", function (e) {
  //     if (!document.getElementById("roomlist").contains(e.target)) {
  //       setSelectedInput(undefined);
  //     }
  //   });
  // }, []);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log("Copied to clipboard:", content);
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  const saveRoom: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("title", formData.get("username"));
    const username = formData.get("username") as string;
    // registerUser(username);
    socket.emit("startaroom", username);
  };

  // const NiceDropdown = ({
  //   onSubmit,
  //   contents,
  // }: {
  //   onSubmit: React.FormEventHandler<HTMLFormElement>;
  //   contents: Array<string>;
  // }) => {
  //   const [selectedInput, setSelectedInput] = useState<string | undefined>();
  //   return (
  //     <>
  //       <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
  //         <button>
  //           <a
  //             href="#"
  //             className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
  //             aria-current="page"
  //           >
  //             <svg
  //               className="w-4 h-4 me-2 text-white"
  //               aria-hidden="true"
  //               xmlns="http://www.w3.org/2000/svg"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //             >
  //               <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
  //             </svg>
  //             Profile
  //           </a>
  //         </button>
  //       </ul>
  //       {/* <Tab /> */}

  //       {/* <div class="md:flex">
  //     <ul class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
  //       <li>
  //           <a href="#" class="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600" aria-current="page">

  //           <svg class="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  //                   <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
  //               </svg>
  //               Profile
  //           </a>
  //       </li>
  //       <ul/>
  //       <div/> */}

  //       <div>Hello dropdown</div>
  //       <form onSubmit={onSubmit}>
  //         {contents.map((content) => (
  //           <div>
  //             <label for={content}>
  //               <input className="" id={content} type="radio"></input> {content}
  //             </label>
  //           </div>
  //         ))}
  //       </form>
  //     </>
  //   );
  // };
  return (
    <>
      <motion.div
        key={"lobby_key"}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="background"
        className="flex flex-col relative w-[448px] h-[581px] bg-sky-950 h-30"
      >
        <div className="text-white">Create room</div>
        <form onSubmit={saveRoom}>
          <input name="username" type="text"></input>
          <button
            className="text-white bg-blue-600 p-2 rounded-lg ml-3"
            type="submit"
          >
            Save
          </button>
        </form>
        <div className="text-white">Select room</div>
        <div id="roomlist">
          <div className="flex flex-col min-w-20 max-w-60 gap-3">
            {/* <nav
              className="flex flex-col space-y-2"
              aria-label="Tabs"
              role="tablist"
              aria-orientation="horizontal"
            >
              {gameList.map((game) => (
                <button
                  type="button"
                  className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 bg-green-600 text-lg font-mono py-1 gap-x-2 border-e-2 border-transparent whitespace-nowra hover:text-blue-600 focus:outline-none focus:text-white disabled:opacity-50 disabled:pointer-events-none active mr-2 rounded-lg"
                  id={game}
                  aria-selected="true"
                  data-hs-tab="#vertical-tab-with-border-1"
                  aria-controls="vertical-tab-with-border-1"
                  role="tab"
                  onClick={(e: any) => {
                    setSelectedInput(game);
                    console.log("roomselected", e.target.value);
                  }}
                  value={game}
                >
                  {game}
                </button>
              ))}
            </nav> */}
            <form>
              {gameList.map((game) => (
                <div className="radio">
                  <label className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 bg-green-600 text-lg font-mono py-1 gap-x-2 border-e-2 border-transparent whitespace-nowra hover:text-blue-600 focus:outline-none focus:text-white disabled:opacity-50 disabled:pointer-events-none active mr-2 rounded-lg">
                    <input
                      type="radio"
                      value={game}
                      checked={selectedInput === game}
                      onChange={() => setSelectedInput(game)}
                    />
                    {game}
                  </label>
                </div>
              ))}
              {/* <div className="radio">
                <label>
                  <input
                    className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 bg-green-600 text-lg font-mono py-1 gap-x-2 border-e-2 border-transparent whitespace-nowra hover:text-blue-600 focus:outline-none focus:text-white disabled:opacity-50 disabled:pointer-events-none active mr-2 rounded-lg"
                    type="radio"
                    value={game}
                  />
                  {game}
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option2" />
                  Option 2
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="option3" />
                  Option 3
                </label>
              </div> */}
            </form>
            <div className="flex flex-row mt-5">
              {selectedInput && (
                <span>
                  <span className="text-white">1.</span>
                  <button
                    className="mx-1 text-white bg-blue-500 p-2 rounded-lg self-start mb-2 hover:text-green-600 text-sm"
                    onClick={() => {
                      if (selectedInput) {
                        handleCopy(
                          ((process.env.NODE_ENV as string) === "development"
                            ? "http://localhost:5173"
                            : "http://multipong.onrender.com") +
                            "/room/" +
                            selectedInput
                        );
                      }
                    }}
                  >
                    Click here to copy join link for{" "}
                    {((process.env.NODE_ENV as string) === "development"
                      ? "http://localhost:5173"
                      : "http://multipong.onrender.com") +
                      "/room/" +
                      selectedInput}{" "}
                    and share it with your friend.
                  </button>
                </span>
              )}

              {selectedInput && (
                <span>
                  <span className="text-white">2.</span>

                  <button
                    className="mx-1 ext-white bg-blue-600 p-2 rounded-lg self-start mb-2 hover:text-green-600 mr-2 text-sm"
                    onClick={() => {
                      if (selectedInput) {
                        // <a href={"localhost:5173/room/" + selectedInput}></a>;
                        // navigate("/room/" + selectedInput);
                        initializeGame(selectedInput);
                      }
                    }}
                  >
                    Click here to join game{" "}
                    <span className="font-bold">{selectedInput}</span>
                  </button>
                </span>
              )}
              {selectedInput && (
                <span>
                  <span className="text-white">3.</span>

                  <div className="mx-1 ext-white bg-blue-600 p-2 rounded-lg self-start mb-2 hover:text-green-600 mr-2 text-sm">
                    The game will begin when your friend joins.
                  </div>
                </span>
              )}
            </div>

            {/* <Link to={"/room/" + selectedInput}>About</Link> */}
          </div>
        </div>

        {/* <form onSubmit={initializeGame}>
          <select name="room">
            {gameList.map((user: string) => (
              <option value={user}>{user}</option>
              // <div>{user}</div>
            ))}
          </select>
          <button>Join room</button>
        </form> */}
      </motion.div>
      {/* <NiceDropdown onSubmit={initializeGame} contents={gameList} /> */}
      {/* <div className="flex flex-wrap"> */}
      {/* <div className="border-e border-gray-200 dark:border-neutral-700"> */}

      {/* </div> */}
    </>
  );
}
export default Lobby;
