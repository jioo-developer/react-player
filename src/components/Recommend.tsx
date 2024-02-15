import React from "react";
import { batch } from "react-redux";
import { recomend_data } from "../recomend_data";
import { ListAdd, PlayStateAction } from "../module/reducer";
import { useMyContext } from "../module/MyContext";
function Recommend() {
  const { dispatch } = useMyContext();
  function recommendPlay() {
    batch(() => {
      dispatch(ListAdd(recomend_data));
      dispatch(PlayStateAction());
    });
  }

  return (
    <section className="Recommend">
      <div className="in_wrap">
        <div className="recommend_txt_wrap">
          <b>
            제작자가 추천하는
            <br />
            플레이리스트
          </b>
          <div className="total_music">
            <figure>
              <img src="/img/play-button.svg" alt="" />
            </figure>
            <figcaption onClick={recommendPlay}>추천곡 들어보기</figcaption>
          </div>
        </div>

        <div className="recommend_album">
          {recomend_data.map(function (item, index) {
            return (
              <div className="album" key={item.id}>
                <figure>
                  <img src={`${item.thumbnail}`} alt=""></img>
                </figure>
                <figcaption>
                  <p>{item.title}</p>
                  <span>{item.singer}</span>
                </figcaption>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container" />
    </section>
  );
}

export default Recommend;
