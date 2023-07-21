import React from "react";
import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";

function Header(props) {


  return (
    <>
      {/* todo header */}
      <div className="text-white text-4xl tracking-[10px] flex justify-between w-[100%] ">
        <span>TODO</span>
        <span className="cursor-pointer" onClick={props.onMyClick}>
          <img src={props.theme === 'dark' ? sun : moon} alt="" />
        </span>
      </div>
      ;
    </>
  );
}

export default Header;
