import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FavoriteAdd } from "../reducer/reducer";

function List({  dispatch, FavoriteName, favoriteState }) {
  const list = useSelector((state) => state.playlist);
  function favoriteHandler(e, index) {
    if (e.target.checked) {
      document.querySelector(`label[for=${e.target.id}]`).classList.add("on");
      dispatch(FavoriteAdd(list[index]));
    } else {
      document
        .querySelector(`label[for=${e.target.id}]`)
        .classList.remove("on");
    }
  }

  useEffect(() => {
    if (favoriteState.length !== 0) {
      localStorage.setItem(FavoriteName, JSON.stringify(favoriteState));
    }
  }, [favoriteState]);

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
                    onClick={(e) => {
                      favoriteHandler(e, index);
                    }}
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
