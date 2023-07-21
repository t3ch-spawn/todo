import React from "react";

function List(props) {
  return (
    <>
      {/* list items */}
      <div className="bg-cardBg">
        <ul>{props.children}</ul>
      </div>
    </>
  );
}

export default List;
