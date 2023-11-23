import React, { useEffect } from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "./components/AddForm";
import List from "./components/List";
import Favorite from "./components/Favorite";
import Player from "./components/Player";
// import { trackUpdate } from "./reducer/reducer";

function App() {
  const dispatch = useDispatch();
  const FavoriteName = "FavoriteName";
  // 트랙 default array

  const list = useSelector((state) => state.playlist);
  // 플레이리스트 state list

  return (
    <div className="App">
      <div className="wrap">
        <Recommend dispatch={dispatch} />
        <Favorite FavoriteName={FavoriteName} dispatch={dispatch} />
        <section className="album_wrap">
          <Player dispatch={dispatch} />
          <AddForm dispatch={dispatch} />
          <List dispatch={dispatch} FavoriteName={FavoriteName} />
        </section>
      </div>
    </div>
  );
}

export default App;
