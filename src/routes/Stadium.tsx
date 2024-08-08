import { useState } from "react";
import "../index.css";

function Stadium() {
  const position = "140px";
  return (
    <>
      <div className="flex flex-col relative w-[80%] max-w-md min-h-screen bg-sky-950 h-30">
        <div className="absolute left-3 min-w-2 min-h-10 bg-white"></div>
        <div
          className={`absolute right-3 bottom-[${position}] min-w-2 min-h-10 bg-white`}
        ></div>
      </div>
    </>
  );
}
export default Stadium;
