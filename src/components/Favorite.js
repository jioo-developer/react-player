import React, { useEffect, useState } from "react";
import { batch, useSelector } from "react-redux";
import {
  FavoriteAdd,
  ListAdd,
  PlayStateAction,
  removeFavorite,
} from "../reducer/reducer";

function Favorite({ FavoriteName, dispatch }) {
  const [list, setList] = useState([]);
  // 즐겨찾기 리스트
  const [done, setDone] = useState(false);
  // 즐겨찾기 삭제 검수 state

  const favoriteState = useSelector((state) => state.favoriteData);
  // 즐겨찾기 상태 state

  const parseFavorite = JSON.parse(localStorage.getItem(FavoriteName));
  //즐겨찾기 리스트 불러오기
  useEffect(() => {
    if (parseFavorite !== null) {
      const loadFavorite = new Promise(function (res) {
        res();
      });
      loadFavorite.then(() => {
        dispatch(FavoriteAdd(parseFavorite));
      });
    }
  }, []);

  useEffect(() => {
    if (favoriteState.length !== 0) {
      setList(favoriteState);
    }
    if (favoriteState.length === 0 && done === true) {
      setList(favoriteState);
      localStorage.setItem(FavoriteName, JSON.stringify(favoriteState));
    }
  }, [favoriteState]);

  // 즐겨찾기를 삭제한 후 즐겨찾기를 업데이트 하는 함수

  // 즐겨찾기 삭제 함수

  function handler(DeleteData) {
    setDone(true);
    let defaultArray = [DeleteData];
    let defaultPromise = new Promise(function (res) {
      const result = parseFavorite.filter(
        (item) =>
          !defaultArray.some(
            (defaultArray) =>
              defaultArray.id === item.id &&
              defaultArray.url === item.url &&
              defaultArray.title === item.title
          )
      );
      res(result);
    });

    defaultPromise.then((res) => {
      dispatch(removeFavorite(res));
    });
  }

  // 즐겨찾기 삭제 함수

  return (
    <>
      {list.length !== 0 ? (
        <>
          <section className="Recently">
            <div className="recently_header">
              <p className="recently_title">자주 듣는 노래</p>
            </div>
            <div className="recently_wrap">
              {list.map((value, index) => {
                return (
                  <article className="recently_music" key={index}>
                    <figure>
                      <img src={value.thumbnail} alt="" />
                    </figure>
                    <div className="data-title">{value.title}</div>
                    {value.singer !== undefined ? (
                      <figcaption>{value.singer}</figcaption>
                    ) : null}
                    <input type="checkbox" id="CheckBtn" />
                    <label htmlFor="CheckBtn" className="check">
                      <ul>
                        <li
                          onClick={() => {
                            batch(() => {
                              dispatch(ListAdd(list[index]));
                              if (audioState !== true) {
                                dispatch(PlayStateAction());
                              }
                            });
                          }}
                        >
                          재생
                        </li>
                        <li
                          onClick={() => {
                            handler(list[index]);
                          }}
                        >
                          삭제
                        </li>
                      </ul>
                    </label>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : null}
    </>
  );
}

export default Favorite;
