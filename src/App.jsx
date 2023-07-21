import { useEffect, useState } from "react";

import Header from "./components/Header";
import List from "./components/List";
import Input from "./components/Input";
import "./App.css";
import bgImgDark from "./images/bg-desktop-dark.jpg";
import bgImgLight from "./images/bg-desktop-light.jpg";
import cross from "./images/icon-cross.svg";
import checked from "./images/icon-check.svg";

function App() {
  const [inpObj, setInpObj] = useState({
    input: "",
    completed: false,
    active: true,
    closed: false,
    exist: true,
  });
  const [selectState, setSelectState] = useState([true, false, false]);
  const [inpArr, setInpArr] = useState([]);
  const [sortArr, setSortArr] = useState([]);
  const [theme, setTheme] = useState("dark");
  let compList = [];
  const [itemsRem, setItemsRem] = useState(0);

  // setting the theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setSortArr(inpArr.slice());
  }, [inpArr]);

  // getting the data from local storage
  useEffect(() => {
    const myData = window.localStorage.getItem("my_todo_data");
    console.log(myData);
    if (myData !== null) {
      setInpArr(JSON.parse(myData));
    }
  }, []);

  // storing the data in localstorage
  useEffect(() => {
    window.localStorage.setItem("my_todo_data", JSON.stringify(inpArr));
  }, [inpArr, sortArr, inpObj]);

  // function that handlesTheme
  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

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
    setSelectState([true, false, false]);

    setInpArr((prev) => {
      if (inpObj.input === "") {
        alert("please put in a to-do");
        setItemsRem(
          prev.filter((curr) => {
            return curr.completed === false;
          }).length
        );
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
      numItemsRem(0);

      return prevArr;
    });
  }

  // function that removes a list item in copy array and original array
  function handleRemove(event) {
    let found;

    setSortArr((prevArr) => {
      let filterList;
      prevArr.forEach((curr, i) => {
        if (event.target.parentElement.dataset.idNum == i) {
          curr.closed = true;
          curr.completed = true;
          found = inpArr.find((curr2) => {
            return curr2.input === curr.input;
          });
        }
      });

      // finding element that was removed in the sort array and removing it from original array
      setInpArr((prev) => {
        prev.splice(prev.indexOf(found), 1);

        return prev;
      });

      numItemsRem(0);

      filterList = prevArr.filter((curr2) => {
        return !curr2.closed;
      });

      return filterList;
    });
  }

  // function that clears all todos that are completed
  function clearCompleted() {
    setSelectState([true, false, false]);
    setInpArr((prevArr) => {
      let filterList;

      numItemsRem(0);

      filterList = prevArr.filter((curr2) => {
        return curr2.completed === false;
      });

      return filterList;
    });
  }

  // function that shows all todos that are not completed, using a copy array
  function showActive() {
    setSelectState([false, true, false]);
    setSortArr(inpArr.slice());

    setSortArr((prevArr) => {
      let filterList;

      numItemsRem(0);

      filterList = prevArr.filter((curr2) => {
        return curr2.active === true;
      });

      return filterList;
    });
  }

  // function that shows all todos available, using a copy array

  function showAll() {
    setSelectState([true, false, false]);

    setSortArr(inpArr.slice());
    setSortArr((prevArr) => {
      let filterList;

      numItemsRem(0);

      filterList = prevArr.filter((curr2) => {
        return curr2.closed === false;
      });

      return filterList;
    });
  }

  // function that shows all todos that are completed, using a copy array
  function showCompleted() {
    setSelectState([false, false, true]);

    setSortArr(inpArr.slice());
    setSortArr((prevArr) => {
      let filterList;

      numItemsRem(0);

      filterList = prevArr.filter((curr2) => {
        return curr2.completed === true;
      });

      return filterList;
    });
  }

  const actualList = sortArr.map((curr, i) => {
    return (
      <li
        key={i}
        data-id-num={i}
        className="dark:bg-cardBg bg-cardBgLight flex justify-between items-center gap-3 py-[20px] px-[15px] w-[100%] relative"
      >
        <span className="flex justify-start items-center w-[100%] gap-3">
          <span
            onClick={handleCompleted}
            style={{
              backgroundImage: ` ${
                curr.completed
                  ? "linear-gradient(to right, hsl(192, 100%, 67%) , hsl(280, 87%, 65%))"
                  : ""
              }`,
            }}
            className="dark:border-lineCol border-lineColLight border-2 rounded-[50%] h-[25px] min-w-[25px] flex justify-center items-center cursor-pointer"
          >
            <img
              className="pointer-events-none"
              src={curr.completed ? checked : ""}
              alt=""
            />
          </span>
          <p
            className={`dark:text-textCol ${
              curr.completed &&
              "dark:text-textColDim text-textColDimLight active"
            } break-all`}
          >
            {curr.input}
          </p>
        </span>
        <img
          className=" pr-[10px] cursor-pointer"
          src={cross}
          alt=""
          onClick={handleRemove}
        />
        <hr className="absolute bottom-0 left-0 w-[100%] dark:bg-lineCol bg-lineColLight border-none h-[1px]" />
      </li>
    );
  });

  return (
    <div className="flex w-[100%] justify-center items-center min-h-[100vh] font-body bg-mainBgLight dark:bg-mainBg">
      {/* backgrounnd image container */}
      <div
        style={{
          backgroundImage:
            theme === "dark" ? `url(${bgImgDark}) ` : `url(${bgImgLight}) `,
        }}
        className="bg-img-container absolute left-0 top-0 w-[100%] h-[300px] "
      >
        <div className="absolute left-0 top-0 w-[100%] h-[100%]">
          {/* <img className="h-[100%] w-[100%]" alt="" /> */}
        </div>
      </div>
      <Card>
        <Header onMyClick={handleTheme} theme={theme} />
        <Input inpPasser={inpAcceptor} onMyClick={showListItem} />
        <List>
          {actualList}
          {/* container for array information */}
          <div className={`sortCont ${itemsRem> 0 ? "shown": ""} dark:bg-cardBg bg-cardBgLight flex justify-between items-center gap-5 p-[10px] w-[100%] relative text-textCol2 `}>
            {/* number of items left */}
            <span>
              {itemsRem === 0
                ? "all done"
                : itemsRem !== 0 &&
                  `${itemsRem} item${itemsRem > 1 ? "s" : ""} left`}
            </span>
            {/* container to sort arrays 1*/}
            <div className="sort1 flex gap-2 cursor-pointer">
              <span
                className={` ${selectState[0] && "selected"}`}
                onClick={showAll}
              >
                All
              </span>
              <span
                className={` ${selectState[1] && "selected"}`}
                onClick={showActive}
              >
                Active
              </span>
              <span
                className={` ${selectState[2] && "selected"}`}
                onClick={showCompleted}
              >
                Completed
              </span>
            </div>

            {/* clear complelted */}
            <span onClick={clearCompleted} className="cursor-pointer">
              Clear completed
            </span>
          </div>
        </List>
        {/* container to sort arrays 2*/}
        <div className="sort2 cursor-pointer dark:bg-cardBg bg-cardBgLight flex justify-center items-center gap-5 p-[10px] w-[100%] relative dark:text-textCol2 text-textColLight">
          <span
            className={`z-[3] ${selectState[0] && "selected"}`}
            onClick={showAll}
          >
            All
          </span>
          <span
            className={`z-[3] ${selectState[1] && "selected"}`}
            onClick={showActive}
          >
            Active
          </span>
          <span
            className={`z-[3] ${selectState[2] && "selected"}`}
            onClick={showCompleted}
          >
            Completed
          </span>
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
