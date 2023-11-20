import React, { useEffect } from "react";
import "./asset/reset.css";
import "./asset/App.scss";
import Recommend from "./components/Recommend";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "./components/AddForm";
import List from "./components/List";
import Favorite from "./components/Favorite";
import Player from "./components/Player";
import { trackUpdate } from "./reducer/reducer";

function App() {
  const dispatch = useDispatch();
  const FavoriteName = "FavoriteName";
  // 트랙 default array

  const audioState = useSelector((state) => state.playState);
  // 재생/일시정지 state

  const list = useSelector((state) => state.playlist);
  // 플레이리스트 state list

  // 트랙 업데이트 함수 redux로 action 시킴
  useEffect(() => {
    if (list.length !== 0) {
      let arr = [];
      list.forEach((value, index) => {
        return arr.push(list[index].url);
      });
      dispatch(trackUpdate(arr));
    }
  }, [list]);

  // 트랙 업데이트 함수 redux로 action 시킴
  // recomend_data의 비공개 동영상은 재생이 안됨

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
          <Player dispatch={dispatch} />
          <AddForm dispatch={dispatch} audioState={audioState} />
          <List dispatch={dispatch} FavoriteName={FavoriteName} />
        </section>
      </div>
    </div>
  );
}

export default App;
