import { useEffect } from "react";
import { useMyContext } from "../module/MyContext";
import { FavoriteAdd, ListAdd, removeFavorite } from "../module/reducer";
import { commonData } from "../module/interfaceModule";

function Favorite() {
  const {
    favoriteDispatch,
    addDispatch,
    playDispatch,
    favoriteData,
    playState,
  } = useMyContext();
  const parseFavorite = JSON.parse(
    localStorage.getItem("FavoriteName") || "{}"
  );

  // 즐겨찾기 리스트 불러오기
  useEffect(() => {
    if (Object.entries(parseFavorite).length > 0) {
      favoriteDispatch(FavoriteAdd(parseFavorite));
    }
  }, []);
  // 즐겨찾기 리스트 불러오기

  // 즐겨찾기 삭제 함수

  function handler(DeleteData: commonData) {
    const defaultArray = [DeleteData];
    const result = favoriteData.filter(
      (item: commonData) =>
        !defaultArray.some(
          (defaultArray) =>
            defaultArray.id === item.id &&
            defaultArray.url === item.url &&
            defaultArray.title === item.title
        )
    );

    favoriteDispatch(removeFavorite(result));
  }

  // 즐겨찾기 삭제 함수

  return (
    <>
      {favoriteData.length > 0 ? (
        <section className="Recently">
          <div className="recently_header">
            <p className="recently_title">자주 듣는 노래</p>
          </div>
          <div className="recently_wrap">
            {favoriteData.map((value, index) => {
              return (
                <article className="recently_music" key={index}>
                  <figure>
                    <img
                      src={value.thumbnail}
                      alt=""
                      style={{ width: 185, height: 140 }}
                    />
                  </figure>
                  <div className="data-title">{value.title}</div>
                  {value.singer ? (
                    <figcaption>{value.singer}</figcaption>
                  ) : (
                    <figcaption>가수 정보 없음</figcaption>
                  )}
                  <input type="checkbox" id="CheckBtn" />
                  <label htmlFor="CheckBtn" className="check">
                    <ul>
                      <li>
                        <button
                          onClick={() => {
                            addDispatch(ListAdd(value));
                            if (!playState) playDispatch(true);
                          }}
                        >
                          재생
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handler(value)}>삭제</button>
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
