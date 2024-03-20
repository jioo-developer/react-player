import React, { ChangeEvent, useState } from "react";
import { ChangeList, trackUpdate } from "../module/reducer.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { commonData } from "../module/interfaceModule";
import { play } from "../module/exportFunction.ts";

function List({ playData }: { playData: commonData }) {
  const {
    playlist,
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
        const memoriseIndex = playlist.filter(
          (item, index) => index === playIndex
        );
        const result = [...newlist, ...filterList];
        const trackResult = [...newtrack, ...filterTrack];
        const findIndex = result.indexOf(memoriseIndex[0]);
        setIndex(findIndex);
        addDispatch(ChangeList(result));
        trackDispatch(trackUpdate(trackResult, "push"));
      } else if (type === "down" && end) {
        const memoriseIndex = playlist.filter(
          (item, index) => index === playIndex
        );
        const result = [...filterList, ...newlist];
        const trackResult = [...filterTrack, ...newtrack];
        const findIndex = result.indexOf(memoriseIndex[0]);
        setIndex(findIndex);
        addDispatch(ChangeList(result));
        trackDispatch(trackUpdate(trackResult, "push"));
      }
      if (end) {
        setArray([]);
        setShuffle(false);
      }
    }
  }

  function directPlay(index: number) {
    const initialArray = [...track];
    const prevSlice = initialArray.splice(index, 1);
    initialArray.unshift(...prevSlice);

    const newPlayList = [...playlist];
    const prevPlayList = newPlayList.splice(index, 1);
    newPlayList.unshift(...prevPlayList);
    setIndex(0);
    trackDispatch(trackUpdate(initialArray, "push"));
    addDispatch(ChangeList(newPlayList));
    if (!playState) playDispatch(true);
  }

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
                <button
                  className="album-shuffle up"
                  onClick={() => shuffleHandler("up")}
                >
                  <img src="img/up.png" alt="" />
                </button>
                <button
                  className="album-shuffle down"
                  onClick={() => shuffleHandler("down")}
                >
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
                      <article
                        onClick={() => {
                          if (!shuffleToggle) {
                            directPlay(index);
                          }
                        }}
                      >
                        {shuffleToggle ? (
                          <input
                            type="checkbox"
                            checked={shuffleArray.includes(index)}
                            onChange={(e: ChangeEvent) =>
                              shuffleCheck(e, index)
                            }
                            id={`shuffle-${index}`}
                            style={{ marginRight: 10 }}
                          />
                        ) : null}

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
                          <h3
                            style={
                              index === playIndex
                                ? { color: "violet" }
                                : { color: "#fff" }
                            }
                          >
                            {item.title}
                          </h3>
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
