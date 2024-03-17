import React, { ChangeEvent, useRef, useState } from "react";
import {
  ChangeList,
  FavoriteAdd,
  removeFavorite,
  trackUpdate,
} from "../module/reducer.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { commonData } from "../module/interfaceModule";

function List() {
  const {
    favoriteDispatch,
    playlist,
    favoriteState,
    track,
    trackDispatch,
    addDispatch,
    playState,
    playDispatch,
  } = useMyContext();

  const [shuffleToggle, setShuffle] = useState(false);
  const [shuffleArray, setArray] = useState<number[] | any>([]);
  const starRef = useRef<HTMLUListElement>(null);

  function directPlay(index: number) {
    const initialArray = [...track];
    const prevSlice = initialArray.splice(index, 1);
    initialArray.unshift(...prevSlice);

    const newPlayList = [...playlist];
    const prevPlayList = newPlayList.splice(index, 1);
    newPlayList.unshift(...prevPlayList);

    trackDispatch(trackUpdate(initialArray));
    addDispatch(ChangeList(newPlayList));
    if (!playState) playDispatch(true);
  }

  function shuffleCheck(e: ChangeEvent, index: number) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setArray((prev) => [...prev, index]);
    } else {
      const array = shuffleArray.filter((item) => item !== index);
      setArray(array);
    }
  }

  function shuffleHandler(direction: string) {
    const newList: commonData[] = [];
    const newtrack: string[] = [];

    shuffleArray.forEach((item, index) => {
      const sliceList = playlist.slice(item, item + 1)[0];
      const sliceTrack = track.slice(item, item + 1)[0];
      newList.push(sliceList);
      newtrack.push(sliceTrack);

      if (shuffleArray.length - 1 === index) {
        setting(newList, newtrack, direction, "end");
      }
    });

    function setting(
      newlist: commonData[],
      newtrack: string[],
      type: string,
      end?: string
    ) {
      //
      const filterList = playlist.filter((item) => !newlist.includes(item));
      const filterTrack = track.filter((item) => !newtrack.includes(item));

      if (type === "up" && end) {
        const result = [...newlist, ...filterList];
        const trackResult = [...newtrack, ...filterTrack];
        addDispatch(ChangeList(result));
        trackDispatch(trackUpdate(trackResult));
      } else if (type === "down" && end) {
        const result = [...filterList, ...newlist];
        const trackResult = [...filterTrack, ...newtrack];
        addDispatch(ChangeList(result));
        trackDispatch(trackUpdate(trackResult));
      }
      if (end) {
        setArray([]);
        setShuffle(false);
      }
    }
  }

  return (
    <div className="album_list">
      <div className="playlist">
        플레이리스트
        {!shuffleToggle ? (
          <button onClick={() => setShuffle(true)}>
            <img src="img/playlist_shuffle.png" alt="" />
          </button>
        ) : (
          <button>
            <button onClick={() => setShuffle(false)}>
              <img src="img/refresh.png" alt="" />
            </button>
            <img src="img/up.png" alt="" onClick={() => shuffleHandler("up")} />
            <img
              src="img/up.png"
              alt=""
              onClick={() => shuffleHandler("down")}
            />
          </button>
        )}
      </div>
      <ul className="list lists" ref={starRef}>
        {playlist.length > 0
          ? playlist.map((value, index) => {
              return (
                <li className="list" key={index}>
                  <div style={{ display: "flex" }}>
                    {shuffleToggle ? (
                      <input
                        type="checkbox"
                        checked={shuffleArray.includes(index)}
                        id={`shuffle-${index}`}
                        style={{ marginRight: 10 }}
                        onChange={(e: ChangeEvent) => shuffleCheck(e, index)}
                      />
                    ) : null}
                    <div
                      className="list_text"
                      onClick={() => {
                        if (!shuffleToggle) {
                          directPlay(index);
                        }
                      }}
                    >
                      {value.title ? value.title : ""}
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    className="star"
                    id={`star${index}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      favoriteHandler(e, value, index)
                    }
                  />
                  <label
                    className={
                      favoriteState.includes(value)
                        ? "star_label on"
                        : "star_label"
                    }
                    htmlFor={`star${index}`}
                  />
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default List;
