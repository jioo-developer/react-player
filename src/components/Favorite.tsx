import { useEffect } from "react";
import { batch } from "react-redux";
import { useMyContext } from "../module/MyContext";
import {
  FavoriteAdd,
  ListAdd,
  PlayStateAction,
  removeFavorite,
} from "../module/reducer";

type favoriteProps = {
  audioState: boolean;
  favoriteState: commonData[];
};

function Favorite({ audioState, favoriteState }: favoriteProps) {
  const { dispatch } = useMyContext();
  // 즐겨찾기 상태 state
  const parseFavorite = JSON.parse(
    localStorage.getItem("FavoriteName") || "{}"
  );
  // 즐겨찾기 리스트 불러오기
  useEffect(() => {
    if (Object.entries(parseFavorite).length > 0) {
      dispatch(FavoriteAdd(parseFavorite));
    }
  }, []);

  function handler(DeleteData: commonData) {
    const defaultArray = [DeleteData];
    const result = favoriteState.filter(
      (item: commonData) =>
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
                            batch(() => {
                              dispatch(ListAdd(value));
                              if (!audioState) dispatch(PlayStateAction(true));
                            });
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
