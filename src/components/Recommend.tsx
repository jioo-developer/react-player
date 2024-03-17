import React from "react";
import { recomend_data } from "../recomend_data.ts";
import { ListAdd, trackUpdate } from "../module/reducer.ts";
import { useMyContext } from "../module/MyContext.tsx";
function Recommend() {
  const { playDispatch, addDispatch, playState, trackDispatch } =
    useMyContext();

  function recommendPlay() {
    const url = recomend_data.map((item) => item.url);
    trackDispatch(trackUpdate(url));
    addDispatch(ListAdd(recomend_data));
    if (!playState) playDispatch(true);
  }

  return (
    <div className="recommend_wrap" style={{ paddingTop: 100 }}>
      <h2 className="mb30">추천 앨범</h2>
      <div className="in_wrap">
        <div className="middle_album">
          {recomend_data.map((item, index) => {
            return (
              <article key={index}>
                <figure>
                  <img
                    src={`${item.thumbnail}`}
                    alt=""
                    className="borderRound middle-thumbnail"
                  />
                  <button className="middle_play">
                    <img src="img/play-icon.png" alt="" />
                  </button>
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

export default Recommend;
