import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FavoriteAdd, removeFavorite } from "../reducer/reducer";

function List({ dispatch, FavoriteName }) {
  const list = useSelector((state) => state.playlist);
  // 현재 리스트

  const favoriteState = useSelector((state) => state.favoriteData);
  // 즐겨찾기 상태 state

  function favoriteHandler(e, index) {
    if (e.target.checked) {
      document.querySelector(`label[for=${e.target.id}]`).classList.add("on");
      dispatch(FavoriteAdd(list[index]));
      // 현재 리스트의 인덱스를 즐겨찾기 리스트에 추가
    } else {
      document
        .querySelector(`label[for=${e.target.id}]`)
        .classList.remove("on");

      const deleteFavorite = favoriteState.filter(
        (item) => item.title !== list[index].title
      );

      dispatch(removeFavorite(deleteFavorite));
    }
    // 다시 끌시 별 다시 꺼짐
  }

  return (
    <div className="album_list">
      <p className="playlist">플레이리스트</p>
      <ul className="list lists">
        {list.length !== 0
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
