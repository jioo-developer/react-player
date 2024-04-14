import React, { useEffect } from "react";
import { useMyContext } from "../module/MyContext.tsx";
import { FavoriteAdd } from "../module/reducer.ts";
import MiddleAlbum from "./albumComponent/Middle.tsx";

function Favorite() {
  const { favoriteDispatch, favoriteState } = useMyContext();

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
        <section className="favorite">
          <div className="favorite_header mb30">
            <h2>자주 듣는 노래</h2>
          </div>
          <MiddleAlbum dataArr={favoriteState} isFavorite={true} />
        </section>
      ) : null}
    </>
  );
}

export default Favorite;
