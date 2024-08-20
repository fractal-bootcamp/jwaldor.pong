import "../index.css";

type StartProps = { handleMode: Function; handleLobby: Function };
const buttonStyle =
  "border-secondary border text-red rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-secondary bg-green-950 hover:bg-[#E8FBF6] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5";
function Start({ handleMode, handleLobby }: StartProps) {
  return (
    <>
      <div className="flex flex-col w-[80%] max-w-md min-h-screen bg-sky-950 h-30 justify-around text-center">
        <div className="text-teal-200">Pong</div>
        <div className="flex flex-row justify-between">
          <button className={buttonStyle} onClick={() => handleMode("human")}>
            Human v. Human
          </button>
          <button className={buttonStyle} onClick={() => handleMode("AI")}>
            Human v. AI
          </button>
          <button className={buttonStyle} onClick={() => handleLobby()}>
            Toggle Lobby
          </button>
        </div>
      </div>
    </>
  );
}
export default Start;
