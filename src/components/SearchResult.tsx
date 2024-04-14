import React, { useEffect } from "react";
import { commonData } from "../module/interfaceModule";
import { useMyContext } from "../module/MyContext.tsx";
import { favoriteHandler } from "../module/exportFunction.ts";
import SmallAlbum from "./albumComponent/Small.tsx";

const SearchResult = ({
  searchData,
  listopen,
}: {
  searchData: commonData;
  listopen: boolean;
}) => {
  const { playlist, play, favoriteState, favoriteDispatch, navigate } =
    useMyContext();

  function playConnecter(type: string) {
    play(searchData, type);
  }

  useEffect(() => {
    if (searchData.title === "") {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="search-result-wrap"
      style={listopen ? { display: "none" } : { display: "block" }}
    >
      <div className="search_in_wrap">
        <figure>
          <img src={searchData.thumbnail} alt={searchData.title} />
        </figure>
        <div className="right_wrap">
          <figcaption>
            <h2> {searchData.title}</h2>
            <p>{searchData.singer}</p>
          </figcaption>
          <div className="button_wrap">
            <button onClick={() => playConnecter("unshift")}>재생</button>
            <button onClick={() => playConnecter("push")}>
              현재 리스트에 추가
            </button>
            <button
              onClick={() =>
                favoriteHandler(searchData, favoriteState, favoriteDispatch)
              }
            >
              <img src="img/addd.jpg" alt="" />
              즐겨찾기에 저장
            </button>
          </div>
        </div>
      </div>
      {playlist.length > 0 ? (
        <h2 style={{ fontSize: 35, marginBottom: 10 }}>플레이리스트</h2>
      ) : null}
      <SmallAlbum dataArr={playlist} />
    </div>
  );
};

export default SearchResult;
