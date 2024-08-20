import { socket } from "./socket";
import { useState } from "react";
// import nav from "@preline/tabs";

function Lobby({
  room,
  setRoom,
  gameList,
  makeMultiplayer,
}: {
  room: string | undefined;
  setRoom: Function;
  gameList: Array<string>;
  makeMultiplayer: Function;
}) {
  const [selectedInput, setSelectedInput] = useState<string | undefined>();

  const initializeGame = (selected_room: string) => {
    console.log("creating room", selected_room, socket.id, "socket.id");
    socket.emit("joinroom", selected_room);
    setRoom(selected_room);
    makeMultiplayer();
  };

  const saveRoom: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!room) {
      const formData = new FormData(event.currentTarget);
      console.log("title", formData.get("username"));
      const username = formData.get("username") as string;
      // registerUser(username);
      socket.emit("startaroom", username);
      console.log("adding room", username);
    } else {
      console.log("user name already set");
    }
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
      <div
        id="background"
        className="flex flex-col relative w-[448px] h-[581px] bg-sky-950 h-30"
      >
        <div className="text-white">Save new room</div>
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
        <div className="flex flex-row min-w-20 max-w-60">
          <nav
            className="flex flex-col space-y-2"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
            onFocus={(e: any) => setSelectedInput(e.target.value)}
          >
            {gameList.map((game) => (
              <button
                type="button"
                className="hs-tab-active:border-blue-500 hs-tab-active:text-blue-600 bg-green-600 text-lg font-mono py-1 gap-x-2 border-e-2 border-transparent whitespace-nowrap text-white hover:text-blue-600 focus:outline-none focus:text-white disabled:opacity-50 disabled:pointer-events-none active mr-2 rounded-lg"
                id="vertical-tab-with-border-item-1"
                aria-selected="true"
                data-hs-tab="#vertical-tab-with-border-1"
                aria-controls="vertical-tab-with-border-1"
                role="tab"
                value={game}
              >
                {game}
              </button>
            ))}
          </nav>
          <button
            className="text-gray-300 bg-blue-600 p-2 rounded-lg self-start mb-2 hover:text-green-600"
            onClick={() => {
              if (selectedInput) {
                initializeGame(selectedInput);
              }
            }}
          >
            Join game
          </button>
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
      </div>
      {/* <NiceDropdown onSubmit={initializeGame} contents={gameList} /> */}
      {/* <div className="flex flex-wrap"> */}
      {/* <div className="border-e border-gray-200 dark:border-neutral-700"> */}

      {/* </div> */}
    </>
  );
}
export default Lobby;
