import React from "react";
import { commonData } from "../module/interfaceModule";
import { useMyContext } from "../module/MyContext.tsx";
import { ListAdd, trackUpdate } from "../module/reducer.ts";
import { favoriteHandler, play } from "../module/exportFunction.ts";

const SearchResult = ({ searchData }: { searchData: commonData }) => {
  const {
    track,
    playlist,
    trackDispatch,
    addDispatch,
    playState,
    favoriteState,
    favoriteDispatch,
    playDispatch,
    setIndex,
  } = useMyContext();

  function playConnecter(type: string) {
    play(
      type,
      track,
      playlist,
      searchData,
      trackDispatch,
      addDispatch,
      playDispatch,
      playState,
      setIndex
    );
  }

  return (
    <div className="search-result-wrap">
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
      <div className="small_album">
        {playlist.length > 0 ? (
          <h2 style={{ fontSize: 35, marginBottom: 10 }}>플레이리스트</h2>
        ) : null}
        {playlist.length > 0
          ? playlist.map((item, index) => {
              return (
                <article key={index}>
                  <figure>
                    <img src={`${item.thumbnail}`} alt="" />
                  </figure>
                  <figcaption>
                    <p>{item.title}</p>
                    <span>{item.singer}</span>
                  </figcaption>
                </article>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SearchResult;
