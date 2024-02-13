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

function App() {
  // 트랙 default array
  const audioState = useSelector((state: useSelectorType) => state.playState);
  // 현재 재생상황 state
  const favoriteState = useSelector(
    (state: useSelectorType) => state.favoriteData
  );
  const list = useSelector((state: useSelectorType) => state.playlist);

  // 즐겨찾기 상태 state

  return (
    <div className="App">
      <MyContextProvider>
        <div className="wrap">
          <Recommend />
          <Favorite audioState={audioState} favoriteState={favoriteState} />
          <section
            className="album_wrap"
            style={
              favoriteState.length > 0
                ? { paddingBottom: 175 }
                : { paddingBottom: 123 }
            }
          >
            <Player audioState={audioState} list={list} />
            <AddForm />
            <List
              audioState={audioState}
              list={list}
              favoriteState={favoriteState}
            />
          </section>
        </div>
      </MyContextProvider>
    </div>
  );
}

export default App;
