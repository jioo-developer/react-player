import React, { useEffect } from "react";
import { batch } from "react-redux";
import {
  FavoriteAdd,
  PlayStateAction,
  removeFavorite,
  trackUpdate,
} from "../module/reducer";
import { useMyContext } from "../module/MyContext";
function List({ audioState, list, favoriteState }) {
  const { dispatch } = useMyContext();
  // 현재 리스트
  // 즐겨찾기 상태 state
  function favoriteHandler(e, index) {
    const target = document.querySelector(`label[for=${e.target.id}]`);
    if (e.target.checked && target) {
      target.classList.add("on");
      dispatch(FavoriteAdd(list[index]));
      // 현재 리스트의 인덱스를 즐겨찾기 리스트에 추가
    } else {
      if (target) {
        target.classList.remove("on");
      }
      const deleteFavorite: favoriteType[] = favoriteState.filter(
        (item) =>
          item.title !== list[index].title &&
          item.url !== list[index].url &&
          item.thumbnail !== list[index].thumbnail
      );

      dispatch(removeFavorite(deleteFavorite));
    }
    // 다시 끌시 별 다시 꺼짐
  }

  useEffect(() => {
    if (list.length) {
      const arr: string[] = [];
      list.forEach((item) => arr.push(item.url));
      batch(() => {
        dispatch(trackUpdate(arr));
        if (!audioState) dispatch(PlayStateAction());
      });
    }
  }, [list]);

  return (
    <div className="album_list">
      <p className="playlist">플레이리스트</p>
      <ul className="list lists">
        {list.length
          ? list.map((value, index) => {
              return (
                <li className="list" key={index}>
                  <p className="list_text">{value.title}</p>
                  <input
                    type="checkbox"
                    className="star"
                    id={`star${index}`}
                    onClick={(e) => favoriteHandler(e, index)}
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
