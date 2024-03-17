import React from "react";
import { commonData } from "../module/interfaceModule";
import { recomend_data } from "../recomend_data.ts";

const SearchResult = ({ searchData }: { searchData: commonData }) => {
  const testArray = [...recomend_data, ...recomend_data];

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
            <button>재생</button>
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
        {testArray.map((item, index) => {
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
        })}
      </div>
    </div>
  );
};

export default SearchResult;
