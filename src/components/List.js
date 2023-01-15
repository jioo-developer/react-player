import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FavoriteAdd } from "../reducer/reducer";

function List({  dispatch, FavoriteName}) {

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
    }
    // 다시 끌시 별 다시 꺼짐
  }

  useEffect(() => {
    if (favoriteState.length !== 0) {
      localStorage.setItem(FavoriteName, JSON.stringify(favoriteState));
    }
  }, [favoriteState]);

  // favoriteHandler 함수가 작동완료 한 다음 
  // favoriteState의 변화가 있을 시 그 변화를 로컬스토리지에 추가하는 함수

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
