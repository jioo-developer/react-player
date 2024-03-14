import React from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend.tsx";
import AddForm from "./components/AddForm.tsx";
import List from "./components/List.tsx";
import Favorite from "./components/Favorite.tsx";
import Player from "./components/Player.tsx";
import { useMyContext } from "./module/MyContext.tsx";
import Replay from "./components/Replay.tsx";
import RandomList from "./components/RandomList.tsx";

function App() {
  const { favoriteState, playlist } = useMyContext();
  return (
    <div className="App">
      <div className="wrap">
        <header>
          <h1 className="logo">
            <img src="img/on_platform_logo_dark.svg" alt="" />
          </h1>
          <AddForm />
        </header>
        <div className="area-padding">
          <Replay />
          <RandomList />
          <Recommend />
        </div>
        {/* <Favorite /> */}
        {/* <section
          className="album_wrap"
          style={
            favoriteState.length > 0 ||
            Object.entries(favoriteState).length > 0 ||
            playlist.length > 0
              ? { paddingBottom: playlist.length * 25 + 150 }
              : { paddingBottom: 250 }
          }
        >
          <Player />
          <List />
        </section> */}
      </div>
    </div>
  );
}

export default App;
