import React from "react";
import logo from "../images/icon-moon.svg";

function Header(props) {
  return (
    <>
      {/* todo header */}
      <div className="text-white text-4xl tracking-[10px] flex justify-between w-[100%] ">
        <span>TODO</span>
        <span>
          <img src={logo} alt="" />
        </span>
      </div>
      ;
    </>
  );
}

export default Header;
