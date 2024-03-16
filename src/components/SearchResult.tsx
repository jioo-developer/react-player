import React from "react";
import { commonData } from "../module/interfaceModule";

const SearchResult = ({ searchData }: { searchData: commonData }) => {
  console.log(searchData);
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
    </div>
  );
};

export default SearchResult;
