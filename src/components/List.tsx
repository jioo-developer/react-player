import React, { useRef } from "react";
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

  const starRef = useRef<HTMLUListElement>(null);

  function favoriteHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    value: commonData,
    index: number
  ) {
    if (starRef.current) {
      if (e.target.checked) {
        if (!favoriteState.includes(value)) {
          favoriteDispatch(FavoriteAdd(value));
          // 즐겨찾기 재생
        }
      } else {
        if (favoriteState.length > 0) {
          const deleteFavorite: commonData[] = favoriteState.filter(
            (item) =>
              item.title !== playlist[index].title &&
              item.url !== playlist[index].url &&
              item.thumbnail !== playlist[index].thumbnail
          );
          favoriteDispatch(removeFavorite(deleteFavorite));
          // 즐겨찾기 삭제
        }
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

    trackDispatch(trackUpdate(initialArray));
    addDispatch(ChangeList(newPlayList));
    if (!playState) playDispatch(true);
  }

  return (
    <div className="album_list">
      <p className="playlist">플레이리스트</p>
      <ul className="list lists" ref={starRef}>
        {playlist.length > 0
          ? playlist.map((value, index) => {
              return (
                <li className="list" key={index}>
                  <div className="list_text" onClick={() => directPlay(index)}>
                    {value.title ? value.title : ""}
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
