function ManageMulti({}: { handleMode: Function; handleLobby: Function }) {
  const buttonStyle =
    "border-secondary border text-white rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-secondary bg-green-950 hover:bg-blue-800 disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5";

  return (
    <>
      <div className="flex flex-row justify-between max-w-sm">
        <button className={buttonStyle} onClick={() => {}}>
          Leave Game
        </button>
        {/* <button
            className={buttonStyle}
            onClick={() => handleMode("multiplayer")}
          >
            Join multiplayer lobby
          </button> */}
      </div>
    </>
  );
}
export default ManageMulti;
