import React, { useEffect, useState } from "react";
import { batch } from "react-redux";
import {
  FavoriteAdd,
  ListAdd,
  PlayStateAction,
  removeFavorite,
} from "../reducer/reducer";

function Favorite({ favoriteState, FavoriteName, dispatch, audioState }) {
  const [list, setList] = useState([]);
  const [done, setDone] = useState(false);
  const parseFavorite = JSON.parse(localStorage.getItem(FavoriteName));

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

  function handler(apiData) {
    setDone(true);
    let defaultArray = [apiData];
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
                            document
                              .querySelector(".playlist")
                              .classList.add("padding-on");
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
