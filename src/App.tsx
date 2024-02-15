import React from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend";
import { useSelector } from "react-redux";
import AddForm from "./components/AddForm";
import List from "./components/List";
import Favorite from "./components/Favorite";
import Player from "./components/Player";
import { MyContextProvider } from "./module/MyContext";

type appProps = {
  playState: boolean;
  favoriteData: commonData[];
  playlist: commonData[];
};

function App() {
  // 트랙 default array
  const audioState = useSelector((state: appProps) => state.playState);
  // 현재 재생상황 state
  const favoriteState = useSelector((state: appProps) => state.favoriteData);
  const list = useSelector((state: appProps) => state.playlist);
  return (
    <div className="App">
      <MyContextProvider>
        <div className="wrap">
          <Recommend />
          <Favorite audioState={audioState} favoriteState={favoriteState} />
          <section className="album_wrap">
            <Player audioState={audioState} playlist={list} />
            <AddForm />
            <List
              audioState={audioState}
              playlist={list}
              favoriteState={favoriteState}
            />
          </section>
        </div>
      </MyContextProvider>
    </div>
  );
}

export default App;
