import React from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend";
import AddForm from "./components/AddForm";
import List from "./components/List";
import Favorite from "./components/Favorite";
import Player from "./components/Player";
import { MyContextProvider, useMyContext } from "./module/MyContext";

function App() {
  const reducerData = useMyContext();
  const favoriteData = reducerData.favoriteData;
  return (
    <div className="App">
      <MyContextProvider>
        <div className="wrap">
          <Recommend />
          <Favorite />
          <section
            className="album_wrap"
            style={
              favoriteData.length > 0
                ? { paddingBottom: 150 }
                : { paddingBottom: 0 }
            }
          >
            <Player />
            <AddForm />
            <List />
          </section>
        </div>
      </MyContextProvider>
    </div>
  );
}

export default App;
