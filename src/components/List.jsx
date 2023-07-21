import React from "react";

function List(props) {
  return (
    <>
      {/* list items */}
      <div  className=" dark:bg-cardBg bg-cardBgLight">
        <ul>{props.children}</ul>
      </div>
    </>
  );
}

export default List;
