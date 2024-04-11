import React from "react";
import { commonData } from "../module/interfaceModule";
import { favoriteHandler } from "../module/exportFunction.ts";
import { useMyContext } from "../module/MyContext.tsx";
function Replay() {
  const loadData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );
  const { favoriteState, favoriteDispatch, play } = useMyContext();
  return (
    <>
      {loadData.length > 0 ? (
        <section className="replay_wrap">
          <h2 className="mb30">다시 듣기</h2>
          <div className="in_wrap">
            <div className="middle_album">
              {loadData.map((item, index) => {
                return (
                  <article className="replay_albumWrap" key={index}>
                    <figure>
                      <button
                        className="middle_favorite"
                        onClick={() =>
                          favoriteHandler(item, favoriteState, favoriteDispatch)
                        }
                      >
                        <img src="img/heart.png" alt="" />
                      </button>
                      <button
                        className="middle_play"
                        onClick={() => play(item, "unshift")}
                      >
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
        </section>
      ) : null}
    </>
  );
}

export default Replay;
