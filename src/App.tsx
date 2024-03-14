import React from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend.tsx";
import AddForm from "./components/AddForm.tsx";
import List from "./components/List.tsx";
import Favorite from "./components/Favorite.tsx";
import Player from "./components/Player.tsx";
import { useMyContext } from "./module/MyContext.tsx";

function App() {
  const { favoriteState, playlist } = useMyContext();
  return (
    <div className="App">
      <div className="wrap">
        <Recommend />
        <Favorite />
        <section
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
          <AddForm />
          <List />
        </section>
      </div>
    </div>
  );
}

export default App;
