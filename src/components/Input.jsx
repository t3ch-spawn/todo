import React, { useRef, useState } from "react";
import uncheck from "../images/icon-check.svg";

function Input(props) {
  const myInp = useRef(null);
  let myInpValue;

  return (
    <>
      {/* todo input */}
      <div className="  dark:bg-cardBg bg-cardBgLight flex justify-start items-center gap-3 py-[20px] px-[15px]">
        <span className="dark:border-lineCol border-lineColLight border-2 rounded-[50%] flex justify-center items-center p-3"></span>
        <input
          onChange={() => {
            props.inpPasser(myInp.current.value);
          }}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              props.onMyClick();
              myInp.current.value = "";
            }
          }}
          className="myInp dark:bg-cardBg bg-cardBgLight w-[90%] dark:text-textCol text-textColLight pr-[10px] outline-none"
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
          className="dark:text-textCol text-textColLight cursor-pointer pr-[10px]"
        >
          add
        </span>
      </div>
    </>
  );
}

export default Input;
