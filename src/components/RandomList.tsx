import React, { useMemo } from "react";
import { recomend_data } from "../recomend_data.ts";
import { commonData } from "../module/interfaceModule.ts";
import { play } from "../module/exportFunction.ts";
import { useMyContext } from "../module/MyContext.tsx";
function RandomList() {
  const loadData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );
  const randomArray: commonData[] = useMemo(() => {
    if (Array.isArray(loadData)) {
      return [...loadData, ...recomend_data];
    } else {
      return [loadData, ...recomend_data];
    }
  }, [loadData]);
  const {
    track,
    playlist,
    trackDispatch,
    addDispatch,
    playDispatch,
    playState,
  } = useMyContext();
  return (
    <>
      {loadData.length > 5 ? (
        <div className="random_wrap">
          <h2 className="mb30">빠른 선곡</h2>
          <div className="in_wrap small">
            <div className="small_album">
              {randomArray.map((item, index) => {
                return (
                  <article
                    key={index}
                    onClick={() =>
                      play(
                        "unshift",
                        track,
                        playlist,
                        item,
                        trackDispatch,
                        addDispatch,
                        playDispatch,
                        playState
                      )
                    }
                  >
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
      ) : null}
    </>
  );
}

export default RandomList;
