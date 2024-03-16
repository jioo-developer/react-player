import React, { useEffect } from "react";
import { useMyContext } from "../module/MyContext.tsx";
import {
  FavoriteAdd,
  ListAdd,
  removeFavorite,
  trackUpdate,
} from "../module/reducer.ts";
import { commonData } from "../module/interfaceModule";

function Favorite({ vw }: { vw: number }) {
  const {
    favoriteDispatch,
    addDispatch,
    playDispatch,
    favoriteState,
    playState,
    trackDispatch,
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

  // 즐겨찾기 삭제 함수

  function handler(DeleteData: commonData) {
    const defaultArray = [DeleteData];
    const result = favoriteState.filter(
      (item: commonData) =>
        !defaultArray.some(
          (defaultArray) =>
            defaultArray.id === item.id &&
            defaultArray.url === item.url &&
            defaultArray.title === item.title
        )
    );

    favoriteDispatch(removeFavorite(result));
  }

  // 즐겨찾기 삭제 함수

  return (
    <>
      {favoriteState.length > 0 ? (
        <section className="favorite" style={{ paddingTop: 57 }}>
          <div className="favorite_header">
            <h2>자주 듣는 노래</h2>
          </div>

          {favoriteState.map((item, index) => {
            return (
              <div className="in_wrap">
                <div className="middle_album">
                  <article className="favorite_albumWrap">
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
                </div>
              </div>
            );
          })}
        </section>
      ) : null}
    </>
  );
}

export default Favorite;
