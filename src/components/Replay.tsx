import React from "react";
import { recomend_data } from "../recomend_data.ts";
function Replay() {
  return (
    <div className="replay_wrap" style={{ paddingTop: 57 }}>
      <h2 className="mb30">다시 듣기</h2>
      <div className="in_wrap">
        <div className="middle_album">
          {recomend_data.map((item, index) => {
            return (
              <article className="replay_albumWrap">
                <figure>
                  <button className="middle_favorite">
                    <img src="img/heart.png" alt="" />
                  </button>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Replay;
