import React from "react";
import { commonData } from "../module/interfaceModule";
function Replay() {
  const loadData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );

  return (
    <>
      {loadData.length > 0 ? (
        <div className="replay_wrap">
          <h2 className="mb30">다시 듣기</h2>
          <div className="in_wrap">
            <div className="middle_album">
              {loadData.map((item, index) => {
                return (
                  <article className="replay_albumWrap" key={index}>
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
      ) : null}
    </>
  );
}

export default Replay;
