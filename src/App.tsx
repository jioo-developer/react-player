import React, { useEffect, useState } from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend.tsx";
import AddForm from "./components/AddForm.tsx";
import { useMyContext } from "./module/MyContext.tsx";
import Replay from "./components/Replay.tsx";
import RandomList from "./components/RandomList.tsx";
import Favorite from "./components/Favorite.tsx";
import { commonData } from "./module/interfaceModule.ts";
import SearchResult from "./components/SearchResult.tsx";

function App() {
  // const initialData: commonData = {
  //   title: "괜찮아도 괜찮아 That's okay",
  //   thumbnail: "img/cheer.jpg",
  //   url: "",
  //   singer: "디오",
  // };
  const initialData: commonData = {
    title: "",
    thumbnail: "",
    url: "",
  };
  const { favoriteState, playlist } = useMyContext();
  const [searchData, setData] = useState<commonData>(initialData);
  const [searchToggle, setToggle] = useState(false);

  const [vw, setVw] = useState(0);
  function updatevW() {
    const vw = window.innerWidth * 1;
    setVw(vw);
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
      <div className="wrap area-padding">
        <>
          {searchData.url !== "" ? (
            <SearchResult searchData={searchData} />
          ) : (
            <>
              <Replay />
              <RandomList />
              <Favorite />
              <Recommend />
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default App;
