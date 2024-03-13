import { recomend_data } from "../recomend_data";
import { ListAdd, trackUpdate } from "../module/reducer";
import { useMyContext } from "../module/MyContext";
function Recommend() {
  const { playDispatch, addDispatch, playState, trackDispatch } =
    useMyContext();

  function recommendPlay() {
    const url = recomend_data.map((item) => item.url);
    trackDispatch(trackUpdate(url));
    addDispatch(ListAdd(recomend_data));
    if (!playState) playDispatch(true);
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
            <figcaption>
              <button onClick={recommendPlay}>추천곡 들어보기</button>
            </figcaption>
          </div>
        </div>

        <div className="recommend_album">
          {recomend_data.map(function (item) {
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
      <div className="container"></div>
      {/* // 아마 백그라운드 잘 유지되게 지탱해주는 것 같음 */}
    </section>
  );
}

export default Recommend;
