import React, { useEffect, useState } from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend.tsx";
import AddForm from "./components/AddForm.tsx";
import Replay from "./components/Replay.tsx";
import RandomList from "./components/RandomList.tsx";
import Favorite from "./components/Favorite.tsx";
import { commonData } from "./module/interfaceModule.ts";
import SearchResult from "./components/SearchResult.tsx";
import Player from "./components/Player.tsx";

function App() {
  const initialData: commonData = {
    title: "",
    thumbnail: "",
    url: "",
    singer: "",
  };

  const [searchData, setData] = useState<commonData>(initialData);
  const [searchToggle, setToggle] = useState(false);
  const [listopen, setListToggle] = useState(false);

  const [vw, setvw] = useState(0);
  function updatevW() {
    const newVW = window.innerWidth * 1;
    const parentWidth = Array.from(
      document.querySelectorAll(".in_wrap")
    ) as HTMLElement[];
    parentWidth.forEach((item) => {
      if (item.classList.contains("small")) {
        if (newVW < 1000) {
          item.style.overflowX = "scroll";
        } else {
          item.style.overflowX = "visible";
        }
      } else {
        if (newVW < 1600) {
          item.style.overflowX = "scroll";
        } else {
          item.style.overflowX = "visible";
        }
      }
    });
    setvw(newVW);
  }
  useEffect(() => {
    updatevW();
    window.addEventListener("resize", updatevW);
    return () => {
      window.removeEventListener("resize", updatevW);
    };
  }, []);

  return (
    <div className="App">
      {!listopen ? (
        <header>
          {(vw < 700 && !searchToggle) || vw > 700 ? (
            <h1 className="logo" onClick={() => setData(initialData)}>
              <img src="img/on_platform_logo_dark.svg" alt="" />
            </h1>
          ) : null}
          <AddForm
            setData={setData}
            vw={vw}
            setToggle={setToggle}
            searchToggle={searchToggle}
          />
        </header>
      ) : null}

      <div className="wrap area-padding">
        <>
          {searchData.url !== "" ? (
            <SearchResult searchData={searchData} />
          ) : !listopen ? (
            <div className="el_wrap">
              <Replay />
              <RandomList />
              <Favorite />
              <Recommend />
            </div>
          ) : null}
          <Player listopen={listopen} setListToggle={setListToggle} />
        </>
      </div>
    </div>
  );
}

export default App;
