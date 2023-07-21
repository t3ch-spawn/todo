import React from "react";

function List(props) {
  return (
    <>
      {/* list items */}
      <div className="bg-cardBg">
        <ul className="h-[0px]">{props.children}</ul>
      </div>
    </>
  );
}

export default List;
