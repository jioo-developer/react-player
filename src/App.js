import React from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "./components/AddForm";
import List from "./components/List";
import Favorite from "./components/Favorite";
import Player from "./components/Player";

function App() {
  const dispatch = useDispatch();
  const FavoriteName = "FavoriteName";
  // 트랙 default array
  const audioState = useSelector((state) => state.playState);
  // 현재 재생상황 state

  return (
    <div className="App">
      <div className="wrap">
        <Recommend dispatch={dispatch} />
        <Favorite
          FavoriteName={FavoriteName}
          dispatch={dispatch}
          audioState={audioState}
        />
        <section className="album_wrap">
          <Player dispatch={dispatch} audioState={audioState} />
          <AddForm dispatch={dispatch} audioState={audioState} />
          <List dispatch={dispatch} audioState={audioState} />
        </section>
      </div>
    </div>
  );
}

export default App;
