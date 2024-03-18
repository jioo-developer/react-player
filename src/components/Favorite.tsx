import React, { useEffect } from "react";
import { useMyContext } from "../module/MyContext.tsx";
import { FavoriteAdd } from "../module/reducer.ts";
import { play } from "../module/exportFunction.ts";

function Favorite() {
  const {
    track,
    playlist,
    trackDispatch,
    addDispatch,
    playDispatch,
    playState,
    favoriteDispatch,
    favoriteState,
    setIndex,
  } = useMyContext();

  const parseFavorite = JSON.parse(
    localStorage.getItem("FavoriteName") || "{}"
  );

  // 즐겨찾기 리스트 불러오기
  useEffect(() => {
    if (Object.entries(parseFavorite).length > 0) {
      favoriteDispatch(FavoriteAdd(parseFavorite));
    }
  }, []);
  // 즐겨찾기 리스트 불러오기

  return (
    <>
      {favoriteState.length > 0 ? (
        <div className="favorite">
          <div className="favorite_header">
            <h2>자주 듣는 노래</h2>
          </div>
          <div className="in_wrap">
            <div className="middle_album">
              {favoriteState.map((item, index) => {
                return (
                  <article
                    className="favorite_albumWrap"
                    key={index}
                    onClick={() =>
                      play(
                        "unshift",
                        track,
                        playlist,
                        item,
                        trackDispatch,
                        addDispatch,
                        playDispatch,
                        playState,
                        setIndex
                      )
                    }
                  >
                    <figure>
                      <button className="middle_play">
                        <img src="img/play-icon.png" alt="" />
                      </button>
                      <img
                        src={`${item.thumbnail}`}
                        alt=""
                        className="middle-thumbnail"
                      />
                    </figure>
                    <figcaption>
                      <p>{item.title}</p>
                      <span>{item.singer}</span>
                    </figcaption>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Favorite;
