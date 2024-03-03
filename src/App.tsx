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
import { commonData } from "./module/interfaceModule";

type appProps = {
  playState: boolean;
  favoriteData: commonData[];
  playlist: commonData[];
  track: string[];
};

function App() {
  const audioState = useSelector((state: appProps) => state.playState);
  const favoriteState = useSelector((state: appProps) => state.favoriteData);
  const list = useSelector((state: appProps) => state.playlist);
  const track = useSelector((state: appProps) => state.track);

  return (
    <div className="App">
      <MyContextProvider>
        <div className="wrap">
          <Recommend audioState={audioState} />
          <Favorite audioState={audioState} favoriteState={favoriteState} />
          <section
            className="album_wrap"
            style={
              favoriteState.length > 0
                ? { paddingBottom: 150 }
                : { paddingBottom: 0 }
            }
          >
            <Player audioState={audioState} playlist={list} track={track} />
            <AddForm />
            <List
              audioState={audioState}
              track={track}
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
