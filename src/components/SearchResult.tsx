import React from "react";
import { commonData } from "../module/interfaceModule";
import { recomend_data } from "../recomend_data.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { ListAdd, trackUpdate } from "../module/reducer.ts";

const SearchResult = ({ searchData }: { searchData: commonData }) => {
  const {
    track,
    playlist,
    trackDispatch,
    addDispatch,
    playState,
    playDispatch,
  } = useMyContext();
  function play() {
    const copyTrack = [...track];
    copyTrack.unshift(searchData.url);
    trackDispatch(trackUpdate(copyTrack));
    const copyPlayList = [...playlist];
    copyPlayList.push(searchData);
    addDispatch(ListAdd(copyPlayList));
    if (!playState) playDispatch(true);
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
            <button onClick={() => play()}>재생</button>
            <button>현재 리스트에 추가</button>
            <button>
              <img src="img/addd.jpg" alt="" />
              즐겨찾기에 저장
            </button>
          </div>
        </div>
      </div>
      <div className="small_album">
        <h2 style={{ fontSize: 35, marginBottom: 10 }}>플레이리스트</h2>
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
