import React from "react";
import { useMyContext } from "../../module/MyContext.tsx";
import { favoriteHandler } from "../../module/exportFunction.ts";
import { commonData } from "../../module/interfaceModule";
type propsType = {
  dataArr: commonData[];
  isFavorite?: boolean;
  round?: boolean;
};

const MiddleAlbum = ({ dataArr, isFavorite, round }: propsType) => {
  const { favoriteState, favoriteDispatch, play, favoriteDelete } =
    useMyContext();

  return (
    <div className="in_wrap">
      <div className="middle_album">
        {dataArr.length > 0
          ? dataArr.map((item, index) => {
              return (
                <article
                  className={
                    isFavorite ? "favorite_albumWrap" : "replay_albumWrap"
                  }
                  key={index}
                >
                  <figure className={round ? "borderRound" : ""}>
                    <button
                      className="middle_favorite"
                      onClick={() => {
                        if (!isFavorite) {
                          favoriteHandler(
                            item,
                            favoriteState,
                            favoriteDispatch
                          );
                        } else {
                          favoriteDelete(item);
                        }
                      }}
                    >
                      {isFavorite ? (
                        <img
                          src="img/delete.png"
                          alt=""
                          style={{ filter: "invert(1)" }}
                        />
                      ) : (
                        <img src="img/heart.png" alt="" />
                      )}
                    </button>
                    <button
                      className="middle_play"
                      onClick={() => play(item, "unshift")}
                    >
                      <img src="img/play-icon.png" alt="" />
                    </button>
                    <img
                      src={`${item.thumbnail}`}
                      alt=""
                      className="middle-thumbnail"
                    />
                  </figure>
                  <figcaption>
                    <p>{item.title}</p>
                    <span>{item.singer}</span>
                  </figcaption>
                </article>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MiddleAlbum;
