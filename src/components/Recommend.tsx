import React from "react";
import { recomend_data } from "../recomend_data.ts";
import { useMyContext } from "../module/MyContext.tsx";
function Recommend() {
  const { play } = useMyContext();

  return (
    <section className="recommend_wrap">
      <h2 className="mb30">추천 앨범</h2>
      <div className="in_wrap">
        <div className="middle_album">
          {recomend_data.map((item, index) => {
            return (
              <article key={index}>
                <figure onClick={() => play(item, "unshift")}>
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
    </section>
  );
}

export default Recommend;
