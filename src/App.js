import React, { useRef } from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddForm from "./components/AddForm";
import List from "./components/List";
import Favorite from "./components/Favorite";
import Player from "./components/Player";

function App() {
  const list = useSelector((state) => state.playlist);
  const favoriteState = useSelector((state) => state.favoriteData);
  const audioState = useSelector((state) => state.playState);
  const dispatch = useDispatch();
  const FavoriteName = "FavoriteName";
  const playerRef = useRef();

  return (
    <div className="App">
      <div className="wrap">
        <Recommend dispatch={dispatch} />
        <Favorite
          favoriteState={favoriteState}
          FavoriteName={FavoriteName}
          dispatch={dispatch}
          audioState={audioState}
        />
        <section className="album_wrap">
          <Player
            list={list}
            playerRef={playerRef}
            dispatch={dispatch}
            audioState={audioState}
          />
          <AddForm dispatch={dispatch} audioState={audioState} />
          <List
            list={list}
            dispatch={dispatch}
            favoriteState={favoriteState}
            FavoriteName={FavoriteName}
          />
        </section>
      </div>
      <footer>제작 : Jioo-developer</footer>
    </div>
  );
}

export default App;
