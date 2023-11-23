import React from "react";
import { PlayStateAction } from "../reducer/reducer";

function Audio({
  dispatch,
  volume,
  audioState,
  loop,
  getVolume,
  loopAction,
  played,
  duration,
  date,
  seekbar,
  handleSeekbar,
  playerRef,
}) {
  function volumControl(e) {
    if (volume > 0) {
      if (e.target.parentElement.classList.contains("volum_up")) {
        getVolume(volume + 1);
      } else if (e.target.parentElement.classList.contains("volum_down")) {
        getVolume(volume - 1);
      }
    }
  }

  function handleSeekMouseUp(e) {
    playerRef.current.seekTo(parseFloat(e.target.value));
  }

  return (
    <div className="control_out_wrap">
      <div className="control_tower">
        <div className="control_wrap">
          <button className="loop control" title="반복재생">
            <img
              src="/img/all_inclusive_black_24dp.svg"
              alt="반복재생"
              style={loop === false ? { opacity: 0.5 } : { opacity: 1 }}
              onClick={() => {
                loopAction(!loop);
                loop === false
                  ? (document.querySelector(".loop").style.opacity = "1")
                  : (document.querySelector(".loop").style.opacity = "0.5");
              }}
            />
          </button>
          <button className="volum control volum_down" title="볼륨다운">
            <img
              src="/img/volume_down_black_24dp.svg"
              alt="볼륨내리기"
              onClick={(e) => volumControl(e)}
            />
          </button>
          <button className="volum control volum_up" title="볼륨업">
            <img
              src="/img/volume_up_black_24dp.svg"
              alt="볼륨올리기"
              onClick={(e) => volumControl(e)}
            />
          </button>
          <button className="next control">
            <img
              src="/img/skip_next_black_24dp.svg"
              alt=""
              className="rotate"
              title="이 기능은 현재 지원하고 있지 않습니다."
            />
          </button>
          <button
            className="next control"
            onClick={() => playerRef.current.seekTo(999)}
          >
            <img src="/img/skip_next_black_24dp.svg" alt="" />
          </button>
          {audioState === true ? (
            <button className="toggle control">
              <img
                src="/img/pause_black_24dp.svg"
                alt="중지"
                onClick={() => dispatch(PlayStateAction())}
              />
            </button>
          ) : (
            <button className="toggle control">
              <img
                src="/img/play_arrow_black_24dp.svg"
                alt="재생"
                onClick={() => dispatch(PlayStateAction())}
              />
            </button>
          )}
        </div>
        <div className="time_wrap">
          <p className="load_time">
            {date(played) === NaN ? "00 : 00" : date(played)}
          </p>
          <input
            type="range"
            step="any"
            className="slider"
            min={0}
            max={0.9999}
            value={seekbar}
            onChange={(e) => handleSeekbar(parseFloat(e.target.value))}
            onMouseUp={(e) => handleSeekMouseUp(e)}
          />
          <p className="full_time">{date(duration)}</p>
        </div>
      </div>
    </div>
  );
}

export default Audio;
