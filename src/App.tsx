import React, { useState } from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import AddForm from "./components/AddForm.tsx";

import SearchResult from "./components/SearchResult.tsx";
import Player from "./components/Player.tsx";
import { commonData } from "./module/interfaceModule.ts";
import Home from "./components/Home.tsx";
import Aside from "./components/Aside.tsx";
import { Route, Routes } from "react-router-dom";

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
  const [playData, setPlayData] = useState({
    title: "",
    singer: "",
    thumbnail: "",
    url: "",
  });

  function goToControl() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="App">
      <div className="wrap">
        <Aside
          vw={vw}
          searchToggle={searchToggle}
          setData={setData}
          setListToggle={setListToggle}
          initialData={initialData}
          listopen={listopen}
        />
        <main>
          <AddForm
            setData={setData}
            vw={vw}
            setToggle={setToggle}
            searchToggle={searchToggle}
            setListToggle={setListToggle}
            listopen={listopen}
            initialData={initialData}
          />
          {!listopen ? (
            <div className="background-cover">
              <div className="cover" />
              <img src="img/background-image.jpg" alt="" className="back-img" />
            </div>
          ) : null}
          <Routes>
            <Route
              path="/"
              element={<Home vw={vw} setvw={setvw} listopen={listopen} />}
            ></Route>

            <Route
              path="/search"
              element={
                <SearchResult searchData={searchData} listopen={listopen} />
              }
            ></Route>
          </Routes>
          <Player
            listopen={listopen}
            setListToggle={setListToggle}
            playData={playData}
            setPlayData={setPlayData}
          />

          {!listopen ? (
            <button
              className="now-player borderRound"
              title={playData.title}
              onClick={() => goToControl()}
            >
              {playData.thumbnail ? (
                <img src={playData.thumbnail} alt="" />
              ) : null}
            </button>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default App;
