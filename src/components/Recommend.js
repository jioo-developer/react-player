import React, { useEffect, useState } from "react";
import { batch } from "react-redux";
import { recomend_data } from "../recomend_data";
import { ListAdd, PlayStateAction } from "../reducer/reducer";

function Recommend({ dispatch }) {

  const [album_data, setAlbum] = useState([]);
  const [toolTip,setTooltip] = useState(false)

  function recommendPlay() {
    batch(() => {
        dispatch(ListAdd(recomend_data));
        dispatch(PlayStateAction());
      });
  }

  useEffect(() => {
    setAlbum(recomend_data);
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
          <div className="total_music">
            <figure>
              <img src="/img/play-button.svg" alt="" />
            </figure>
            <figcaption onClick={recommendPlay}>추천곡 들어보기</figcaption>
            <span className="questions" onClick={()=>{
              setTooltip(!toolTip)
            }}>?</span>
          </div>
        </div>
        {
          toolTip ? <p className="recomend_tip">재생이 안된다면 외부에서 실행이 비공개된 곡 입니다.</p> :  null
        }
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
