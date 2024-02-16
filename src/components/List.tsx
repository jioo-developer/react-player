import React, { useEffect, useRef } from "react";
import { batch } from "react-redux";
import {
  ChangeList,
  FavoriteAdd,
  PlayStateAction,
  removeFavorite,
  trackUpdate,
} from "../module/reducer";
import { useMyContext } from "../module/MyContext";

type playerProps = {
  audioState: boolean;
  playlist: commonData[];
  favoriteState: commonData[];
  track: string[];
};

function List({ audioState, playlist, favoriteState, track }: playerProps) {
  const { dispatch } = useMyContext();
  const starRef = useRef<HTMLUListElement>(null);

  function favoriteHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    value: commonData,
    index: number
  ) {
    if (starRef.current) {
      if (e.target.checked) {
        if (!favoriteState.includes(value)) {
          dispatch(FavoriteAdd(value));
          // 현재 리스트의 인덱스를 즐겨찾기 리스트에 추가
        }
      } else {
        if (favoriteState.length > 0) {
          const deleteFavorite: commonData[] = favoriteState.filter(
            (item) =>
              item.title !== playlist[index].title &&
              item.url !== playlist[index].url &&
              item.thumbnail !== playlist[index].thumbnail
          );
          dispatch(removeFavorite(deleteFavorite));
        }
      }
    }
  }

  function directPlay(index: number) {
    const initialArray = [...track];
    console.log(initialArray);
    const prevSlice = initialArray.splice(index, 1);
    initialArray.unshift(...prevSlice);

    const newPlayList = [...playlist];
    console.log(newPlayList);
    const prevPlayList = newPlayList.splice(index, 1);
    newPlayList.unshift(...prevPlayList);

    dispatch(trackUpdate(initialArray));
    dispatch(ChangeList(newPlayList));
  }

  useEffect(() => {
    if (playlist.length > 0) {
      const arr: string[] = [];
      playlist.forEach((item) => arr.push(item.url));
      batch(() => {
        dispatch(trackUpdate(arr));
        if (!audioState) dispatch(PlayStateAction(true));
      });
    }
  }, [playlist]);

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
