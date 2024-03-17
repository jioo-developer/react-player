import React from "react";
import { recomend_data } from "../recomend_data.ts";
function RandomList() {
  const testArray = [...recomend_data, ...recomend_data];
  return (
    <div className="random_wrap" style={{ paddingTop: 100 }}>
      <h2 className="mb30">빠른 선곡</h2>
      <div className="in_wrap small">
        <div className="small_album">
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
    </div>
  );
}

export default RandomList;
