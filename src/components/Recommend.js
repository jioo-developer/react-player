import React, { useEffect, useState } from "react";
import { batch } from "react-redux";
import { getData, getThumb } from "../recomend_data";
import { ListAdd, PlayStateAction } from "../reducer/reducer";
function Recommend({ dispatch }) {
  const [album_data, setAlbum] = useState([]);
  function recommendPlay() {
    getData().then((res) => {
      batch(() => {
        dispatch(ListAdd(res));
        dispatch(PlayStateAction());
      });
    });
    setTimeout(() => {
      document.querySelector(".playlist").classList.add("padding-on");
    }, 500);
  }

  useEffect(() => {
    getThumb().then((result) => {
      setAlbum(result);
    });
  }, []);
  return (
    <section className="Recommend">
      <div className="cover"></div>
      <div className="container">
        <img src="/img/background.jpg" alt="" />
      </div>
      <div className="in_wrap">
        <div className="recommend_txt_wrap">
          <b>
            제작자가 추천하는
            <br />
            플레이리스트
          </b>
          <div className="total_music" onClick={recommendPlay}>
            <figure>
              <img src="/img/play-button.svg" alt="" />
            </figure>
            <figcaption>추천곡 들어보기</figcaption>
          </div>
        </div>
        <div className="recommend_album">
          {album_data.length !== 0
            ? album_data.map(function (a, i) {
                return (
                  <div className="album" key={album_data[i].id}>
                    <figure>
                      <img src={`/img/${i}.jpg`} alt=""></img>
                    </figure>
                    <figcaption>
                      <p>{album_data[i].title}</p>
                      <span>{album_data[i].singer}</span>
                    </figcaption>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
}

export default Recommend;
