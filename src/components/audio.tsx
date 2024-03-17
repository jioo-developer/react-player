import React, { useCallback, useState } from "react";
import { useMyContext } from "../module/MyContext.tsx";
import ReactPlayer from "react-player";

type audioProps = {
  volume: number;
  getVolume: (params: number) => void;
  handleSeekbar: (params: number) => void;
  played: number;
  duration: number;
  TimeLogic: (parmas: number) => string;
  seekbar: number;
  playRef: ReactPlayer | null;
  thumbIndex: number | null;
  title: string;
};

function Audio({
  volume,
  getVolume,
  played,
  duration,
  TimeLogic,
  seekbar,
  title,
  handleSeekbar,
  playRef,
  thumbIndex,
}: audioProps) {
  const { playDispatch, playState, playlist, listToggle } = useMyContext();
  const [loopToggle, setLoop] = useState(false);
  const volumControl = (parmas: string) => {
    if (parmas === "up") {
      if (volume < 9) {
        getVolume(volume + 1);
      } else {
        getVolume(volume);
      }
    } else {
      getVolume(volume - 1);
    }
  };

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as HTMLInputElement;
    if (playRef && target) {
      playRef.seekTo(parseFloat(target.value));
    }
  };

  const thumbnailHanlder = useCallback(() => {
    if (thumbIndex !== null && playlist.length > 0) {
      return (
        <img
          src={playlist[thumbIndex].thumbnail}
          alt=""
          style={{ position: "absolute", top: 0, zIndex: 100, width: "100%" }}
          onError={(e) =>
            ((e.target as HTMLImageElement).src = "/img/defaultImg.png")
          }
        />
      );
    } else return null;
  }, [thumbIndex, playlist]);

  return (
    <div className="control_out_wrap">
      <div className="control_tower">
        <div className="control_wrap">
          <button className="next control">
            <img
              src="/img/skip_next_black_24dp.svg"
              alt=""
              className="rotate"
              style={{ transform: "rotate(180deg)" }}
              title="이 기능은 현재 지원하고 있지 않습니다."
            />
          </button>
          <button
            className="toggle control"
            onClick={() => playDispatch((prev) => !prev)}
          >
            {playState ? (
              <img src="/img/pause_black_24dp.svg" alt="중지" />
            ) : (
              <img src="/img/play_arrow_black_24dp.svg" alt="재생" />
            )}
          </button>
          <button
            className="next control"
            onClick={() => {
              if (playRef) playRef.seekTo(999);
            }}
          >
            <img src="/img/skip_next_black_24dp.svg" alt="" />
          </button>
        </div>
        <div className="time_wrap">
          <p className="load_time">{TimeLogic(played)}</p>
          <p style={{ margin: "0 5px" }}>/</p>
          <p className="full_time">{TimeLogic(duration)}</p>
        </div>
      </div>
      <input
        type="range"
        step="any"
        className="slider"
        min={0}
        max={0.9999}
        value={seekbar}
        onChange={(e) => handleSeekbar(parseFloat(e.target.value))}
        onMouseUp={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>
          handleSeekMouseUp(e)
        }
      />
      <div className="control-info">
        {thumbIndex ? (
          <>
            <figure>{thumbnailHanlder()}</figure>
            <figcaption>
              <p>{title}</p>
              <span>{playlist[thumbIndex].singer}</span>
            </figcaption>
          </>
        ) : null}
      </div>
      <div className="control-option">
        <button
          className="volum control volum_down"
          title="볼륨다운"
          onClick={() => volumControl("down")}
        >
          <img src="/img/volume_down_black_24dp.svg" alt="볼륨내리기" />
        </button>
        <button
          className="volum control volum_up"
          title="볼륨업"
          onClick={() => volumControl("up")}
        >
          <img src="/img/volume_up_black_24dp.svg" alt="볼륨올리기" />
        </button>
        <button>
          <img
            src={loopToggle ? "/img/oneplay.jpg" : "/img/allplay.jpg"}
            alt=""
          />
        </button>

        <button>
          <img
            src="/img/play-icon.png"
            alt=""
            style={
              listToggle
                ? { transform: "rotate(270deg)" }
                : { transform: "rotate(90deg)" }
            }
          />
        </button>
      </div>
    </div>
  );
}

export default Audio;
