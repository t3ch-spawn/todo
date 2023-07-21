import React, { useRef, useState } from "react";
import uncheck from "../images/icon-check.svg";

function Input(props) {
  const myInp = useRef(null);
  let myInpValue;

  return (
    <>
      {/* todo input */}
      <div className="  bg-cardBg flex justify-start items-center gap-3 py-[20px] px-[10px]">
        <span className="border-black border-2 rounded-[50%] flex justify-center items-center p-3"></span>
        <input
          onChange={() => {
            props.inpPasser(myInp.current.value);
          }}
          className="myInp bg-cardBg w-[90%] text-textCol pr-[10px] outline-none"
          type="text"
          id="myInput"
          ref={myInp}
          placeholder="Create new todo"
        />
        <span
          onClick={() => {
            myInp.current.value = "";
            props.onMyClick();
          }}
          className="text-textCol cursor-pointer pr-[10px]"
        >
          add
        </span>
      </div>
    </>
  );
}

export default Input;
