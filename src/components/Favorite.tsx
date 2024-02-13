import React from "react";
import { batch } from "react-redux";
import { useMyContext } from "../module/MyContext";
import { ListAdd, PlayStateAction, removeFavorite } from "../module/reducer";
function Favorite({ audioState, favoriteState }) {
  const { dispatch } = useMyContext();

  // 즐겨찾기 상태 state
  const parseFavorite = JSON.parse(
    localStorage.getItem("FavoriteName") || "{}"
  );
  //즐겨찾기 리스트 불러오기
  // useEffect(() => {
  //   if (parseFavorite !== null) dispatch(FavoriteAdd(parseFavorite));
  // }, []);

  // 즐겨찾기를 삭제한 후 즐겨찾기를 업데이트 하는 함수

  // 즐겨찾기 삭제 함수

  function handler(DeleteData: favoriteType) {
    const defaultArray = [DeleteData];
    const result = parseFavorite.filter(
      (item) =>
        !defaultArray.some(
          (defaultArray) =>
            defaultArray.id === item.id &&
            defaultArray.url === item.url &&
            defaultArray.title === item.title
        )
    );

    dispatch(removeFavorite(result));
  }

  // 즐겨찾기 삭제 함수

  return (
    <>
      {favoriteState.length ? (
        <section className="Recently">
          <div className="recently_header">
            <p className="recently_title">자주 듣는 노래</p>
          </div>
          <div className="recently_wrap">
            {favoriteState.map((value, index) => {
              return (
                <article className="recently_music" key={index}>
                  <figure>
                    <img src={value.thumbnail} alt="" />
                  </figure>
                  <div className="data-title">{value.title}</div>
                  {value.singer !== undefined ? (
                    <figcaption>{value.singer}</figcaption>
                  ) : null}
                  <input type="checkbox" id="CheckBtn" />
                  <label htmlFor="CheckBtn" className="check">
                    <ul>
                      <li
                        onClick={() => {
                          batch(() => {
                            dispatch(ListAdd(favoriteState[index]));
                            if (!audioState) dispatch(PlayStateAction());
                          });
                        }}
                      >
                        재생
                      </li>
                      <li onClick={() => handler(favoriteState[index])}>
                        삭제
                      </li>
                    </ul>
                  </label>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default Favorite;
