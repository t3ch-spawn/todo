import { useState } from "react";

import Header from "./components/Header";
import List from "./components/List";
import Input from "./components/Input";
import "./App.css";
import bgImg from "./images/bg-desktop-dark.jpg";
import cross from "./images/icon-cross.svg";
import checked from "./images/icon-check.svg";

function App() {
  const [inpObj, setInpObj] = useState({
    input: "",
    completed: false,
    active: true,
    closed: false,
  });
  const [inpArr, setInpArr] = useState([]);
  let compList = [];
  const [itemsRem, setItemsRem] = useState(0);

  // function that receives typed input from child component
  function inpAcceptor(receivedInp) {
    setInpObj((prevObj) => {
      return {
        ...prevObj,
        input: receivedInp,
      };
    });
  }

  function numItemsRem(num) {
    compList = inpArr.filter((curr) => {
      return curr.completed === false;
    });
    setItemsRem(compList.length + num);
  }

  // function that sets array of inputs and shows it
  function showListItem() {
    setInpArr((prev) => {
      if (inpObj.input === "") {
        alert("please put in a to-do");
        return [...prev];
      } else {
        return [inpObj, ...prev];
      }
    });

    setInpObj((prevObj) => {
      return {
        ...prevObj,
        input: "",
      };
    });

    // compList = inpArr.filter((curr) => {
    //   return curr.completed === false;
    // });
    // setItemsRem(compList.length + 1);
    numItemsRem(1);
  }

  // function that checks a list item
  function handleCompleted(event) {
    setInpArr((prevArr) => {
      prevArr.forEach((curr, i, arr) => {
        if (event.target.parentElement.parentElement.dataset.idNum == i) {
          curr.completed = !curr.completed;
          curr.active = !curr.active;
        }
      });

      setInpObj((prevObj) => {
        return {
          ...prevObj,
        };
      });

      // compList = inpArr.filter((curr) => {
      //   return curr.completed === false;
      // });
      // setItemsRem(compList.length);
      numItemsRem(0);

      return prevArr;
    });
  }

  // function that removes a list item
  function handleRemove(event) {
    setInpArr((prevArr) => {
      let filterList;
      prevArr.forEach((curr, i) => {
        if (event.target.parentElement.dataset.idNum == i) {
          curr.closed = true;
          curr.completed = true;
        }
      });
      numItemsRem(0);

      filterList = prevArr.filter((curr2) => {
        return !curr2.closed;
      });

      return filterList;
    });
  }

  const actualList = inpArr.map((curr, i) => {
    return (
      <li
        key={i}
        data-id-num={i}
        className="bg-cardBg flex justify-between items-center gap-3 p-[10px] w-[100%] relative"
      >
        <span className="flex justify-start w-[100%] gap-3">
          <span
            onClick={handleCompleted}
            className="border-black border-2 cursor-pointer rounded-[50%] h-[25px] w-[25px] flex justify-center items-center"
          >
            <img
              className="pointer-events-none"
              src={curr.completed ? checked : ""}
              alt=""
            />
          </span>
          <p className={`text-textCol ${curr.completed && "active"} `}>
            {curr.input}
          </p>
        </span>
        <img
          className=" pr-[10px] cursor-pointer"
          src={cross}
          alt=""
          onClick={handleRemove}
        />
      </li>
    );
  });

  return (
    <div className="flex w-[100%] justify-center items-center min-h-[100vh] font-body bg-mainBg">
      {/* backgrounnd image container */}
      <div className="bg-img-container absolute left-0 top-0 w-[100%] h-[300px] ">
        <div className="absolute left-0 top-0 w-[100%] h-[100%]">
          {/* <img src={bgImg} className="h-[100%] w-[100%]" alt="" /> */}
        </div>
      </div>
      <Card>
        <Header />
        <Input inpPasser={inpAcceptor} onMyClick={showListItem} />
        <List>
          {actualList}
          {/* container for array information */}
          <div className="bg-cardBg flex justify-between items-center gap-5 p-[10px] w-[100%] relative text-textCol2">
            {/* number of items left */}
            <span>
              {itemsRem === 0
                ? "all done"
                : itemsRem !== 0 &&
                  `${itemsRem} item${itemsRem > 1 ? "s" : ""} left`}
            </span>
            {/* container to sort arrays 1*/}
            <div className="sort1 flex gap-2 cursor-pointer">
              <span>All</span>
              <span>Active</span>
              <span>Completed</span>
            </div>

            {/* clear complelted */}
            <span className="cursor-pointer">Clear completed</span>
          </div>
        </List>
               {/* container to sort arrays 2*/}
               <div className="sort2 cursor-pointer bg-cardBg flex justify-center items-center gap-5 p-[10px] w-[100%] relative text-textCol2">
              <span>All</span>
              <span>Active</span>
              <span>Completed</span>
            </div>
      </Card>
    </div>
  );
}

export default App;

// component for the card
function Card(props) {
  return (
    <div className="flex flex-col gap-4 min-h-[400px] min-w-[100px] relative z-[2] m-[20px]">
      {props.children}
    </div>
  );
}
