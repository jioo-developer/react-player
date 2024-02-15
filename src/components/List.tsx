import React, { useEffect, useRef } from "react";
import { batch } from "react-redux";
import {
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
};

function List({ audioState, playlist, favoriteState }: playerProps) {
  const { dispatch } = useMyContext();
  const starRef = useRef<HTMLUListElement>(null);
  // 현재 리스트
  // 즐겨찾기 상태 state

  function favoriteHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    value: commonData,
    index: number
  ) {
    if (starRef.current) {
      const target = starRef.current?.children[index];
      if (e.target.checked) {
        target.classList.add("on");
        dispatch(FavoriteAdd(value));
        // 현재 리스트의 인덱스를 즐겨찾기 리스트에 추가
      } else {
        target.classList.remove("on");

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

    // 다시 끌시 별 다시 꺼짐
  }

  useEffect(() => {
    if (playlist.length > 0) {
      const arr: string[] = [];
      playlist.forEach((item) => arr.push(item.url));
      batch(() => {
        dispatch(trackUpdate(arr));
        if (!audioState) dispatch(PlayStateAction());
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
                  <p className="list_text">{value.title ? value.title : ""}</p>
                  <input
                    type="checkbox"
                    className="star"
                    id={`star${index}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      favoriteHandler(e, value, index)
                    }
                  />
                  <label className="star_label" htmlFor={`star${index}`} />
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default List;
