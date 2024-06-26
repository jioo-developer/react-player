import React, { ChangeEvent, useState } from "react";
import { ChangeList, addGroup, trackUpdate } from "../module/reducer.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { commonData } from "../module/interfaceModule";

type props = {
  playData: commonData;
  setListToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

function List({ playData, setListToggle }: props) {
  const {
    play,
    playlist,
    track,
    trackDispatch,
    addDispatch,
    playState,
    playDispatch,
    playIndex,
    setIndex,
    groupTitle,
    setGroupTitle,
    groupList,
    groupTrackDispatch,
  } = useMyContext();

  const [shuffleToggle, setShuffle] = useState(false);
  const [shuffleArray, setArray] = useState<number[] | any>([]);
  const [listName, setName] = useState(false);

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
        setting(newList, newtrack, direction);
      }
    });

    function setting(newlist: commonData[], newtrack: string[], type: string) {
      const filterList = playlist.filter((item) => !newlist.includes(item));
      const filterTrack = track.filter((item) => !newtrack.includes(item));

      const memoriseIndex = playlist.filter(
        (item, index) => index === playIndex
      );

      let result: commonData[] = [];
      let trackResult: string[] = [];

      if (type === "up") {
        result = [...newlist, ...filterList];
        trackResult = [...newtrack, ...filterTrack];
      } else if (type === "down") {
        result = [...filterList, ...newlist];
        trackResult = [...filterTrack, ...newtrack];
      }
      const findIndex = result.indexOf(memoriseIndex[0]);
      setIndex(findIndex);
      addDispatch(ChangeList(result));
      trackDispatch(trackUpdate(trackResult, "push"));
      setArray([]);
      setShuffle(false);
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

  function listGroupHandler() {
    if (groupTitle !== "") {
      const object = {
        title: groupTitle,
        dataArr: playlist,
      };
      const copyArr = [...groupList];
      copyArr.push(object);
      groupTrackDispatch(addGroup(copyArr));
      localStorage.setItem("listGroup", JSON.stringify(copyArr));
      setName(false);
    }
  }

  function deleteHandler(url: string, index: number) {
    const newList = playlist.filter((item) => item.url !== url);
    const newTrack = track.filter((item) => item !== url);
    addDispatch(ChangeList(newList));
    trackDispatch(trackUpdate(newTrack, "push"));
    if (index === track.length - 1) {
      setIndex(0);
    }
    if (newTrack.length === 0) {
      setListToggle(false);
    }
  }

  return (
    <div className="list_wrap">
      {listName ? (
        <div className="find-form">
          <input
            type="text"
            className="form-control"
            placeholder="현재 리스트명을 지정해주세요."
            required
            onChange={(e) => setGroupTitle(e.target.value)}
          />
          <div className="btn_wrap">
            <button
              className="btn"
              onClick={() => {
                setGroupTitle("");
                setName(false);
              }}
            >
              취소
            </button>
            <button className="btn" onClick={() => listGroupHandler()}>
              완료
            </button>
          </div>
        </div>
      ) : null}
      <div className="right_list">
        <div className="right_top">
          <div className="now-info">
            <p>재생 중인 트랙</p>
            <p>{playData.title}</p>
            <div className="now-info-btn-wrap">
              <button className="nowlistSave" onClick={() => setName(true)}>
                <img src="img/listadd.jpg" alt="" />
              </button>
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
                            onClick={() => play(item, "unshift")}
                          >
                            <img src="img/play-icon.png" alt="" />
                          </button>
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="middle-thumbnail"
                            style={{ height: "100%" }}
                          />
                        </figure>
                        <figcaption
                          onClick={() => {
                            if (!shuffleToggle) {
                              directPlay(index);
                            }
                          }}
                        >
                          <h3
                            style={
                              index === playIndex
                                ? { color: "violet" }
                                : { color: "#fff" }
                            }
                          >
                            {item.title}
                          </h3>
                          <p>{item.singer}</p>
                        </figcaption>
                        <div className="list-more-btns">
                          <button className="list_more">
                            <img src="img/more-option.png" alt="" />
                          </button>
                          <button
                            className="delete-more"
                            onClick={() => deleteHandler(item.url, index)}
                          >
                            현재 재생목록에서 삭제
                          </button>
                        </div>
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
