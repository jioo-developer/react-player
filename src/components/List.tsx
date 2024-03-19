import React, { ChangeEvent, useRef, useState } from "react";
import {
  ChangeList,
  FavoriteAdd,
  removeFavorite,
  trackUpdate,
} from "../module/reducer.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { commonData } from "../module/interfaceModule";
import { play } from "../module/exportFunction.ts";

function List({ playData }: { playData: commonData }) {
  const {
    favoriteDispatch,
    playlist,
    favoriteState,
    track,
    trackDispatch,
    addDispatch,
    playState,
    playDispatch,
    playIndex,
    setIndex,
  } = useMyContext();

  const [shuffleToggle, setShuffle] = useState(false);
  const [shuffleArray, setArray] = useState<number[] | any>([]);

  function shuffleCheck(e: ChangeEvent, index: number) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setArray((prev) => [...prev, index]);
    } else {
      const array = shuffleArray.filter((item) => item !== index);
      setArray(array);
    }
  }

  // function shuffleHandler(direction: string) {
  //   const newList: commonData[] = [];
  //   const newtrack: string[] = [];

  //   shuffleArray.forEach((item, index) => {
  //     const sliceList = playlist.slice(item, item + 1)[0];
  //     const sliceTrack = track.slice(item, item + 1)[0];
  //     newList.push(sliceList);
  //     newtrack.push(sliceTrack);

  //     if (shuffleArray.length - 1 === index) {
  //       setting(newList, newtrack, direction, "end");
  //     }
  //   });

  //   function setting(
  //     newlist: commonData[],
  //     newtrack: string[],
  //     type: string,
  //     end?: string
  //   ) {
  //     //
  //     const filterList = playlist.filter((item) => !newlist.includes(item));
  //     const filterTrack = track.filter((item) => !newtrack.includes(item));

  //     if (type === "up" && end) {
  //       const result = [...newlist, ...filterList];
  //       const trackResult = [...newtrack, ...filterTrack];
  //       addDispatch(ChangeList(result));
  //       trackDispatch(trackUpdate(trackResult));
  //     } else if (type === "down" && end) {
  //       const result = [...filterList, ...newlist];
  //       const trackResult = [...filterTrack, ...newtrack];
  //       addDispatch(ChangeList(result));
  //       trackDispatch(trackUpdate(trackResult));
  //     }
  //     if (end) {
  //       setArray([]);
  //       setShuffle(false);
  //     }
  //   }
  // }

  return (
    <div className="list_wrap">
      <div className="right_list">
        <div className="right_top">
          <div className="now-info">
            <h4>재생 중인 트랙</h4>
            <h3>{playData.title}</h3>
          </div>
          <div className="shuffle_wrap">
            {shuffleToggle ? (
              <>
                <button className="album-shuffle up">
                  <img src="img/up.png" alt="" />
                </button>
                <button className="album-shuffle down">
                  <img
                    src="img/up.png"
                    alt=""
                    style={{ transform: "rotate(180deg)" }}
                  />
                </button>
              </>
            ) : (
              <button
                className="album-shuffle"
                onClick={() => setShuffle((prev) => !prev)}
              >
                <img src="img/playlist_shuffle.png" alt="" />
              </button>
            )}
          </div>
        </div>
        <ul className="list">
          {playlist.length > 0 ? (
            <>
              {playlist.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="small_album">
                      <article>
                        <figure>
                          <button
                            className="middle_play"
                            onClick={() =>
                              play(
                                "unshift",
                                track,
                                playlist,
                                item,
                                trackDispatch,
                                addDispatch,
                                playDispatch,
                                playState,
                                setIndex
                              )
                            }
                          >
                            <img src="img/play-icon.png" alt="" />
                          </button>
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="middle-thumbnail"
                          />
                        </figure>
                        <figcaption>
                          <h3>{item.title}</h3>
                          <span>{item.singer}</span>
                        </figcaption>
                      </article>
                    </div>
                  </li>
                );
              })}
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default List;
