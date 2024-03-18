import React, { useCallback } from "react";
import { useMyContext } from "../module/MyContext.tsx";
import ReactPlayer from "react-player";
import { commonData } from "../module/interfaceModule.ts";

type audioProps = {
  volume: number;
  getVolume: (params: number) => void;
  handleSeekbar: (params: number) => void;
  played: number;
  duration: number;
  TimeLogic: (parmas: number) => string;
  seekbar: number;
  playRef: ReactPlayer | null;
  playData: commonData;
  currentVideoContorl: (direction: string) => void;
  setConnect: React.Dispatch<React.SetStateAction<boolean>>;
  loopConnect: boolean;
};

function Audio({
  volume,
  getVolume,
  played,
  duration,
  TimeLogic,
  seekbar,
  handleSeekbar,
  playRef,
  playData,
  currentVideoContorl,
  setConnect,
  loopConnect,
}: audioProps) {
  const { playDispatch, playState, playlist, listToggle } = useMyContext();
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
    if (playData.title !== "" && playlist.length > 0) {
      return (
        <img
          src={playData.thumbnail}
          alt=""
          onError={(e) =>
            ((e.target as HTMLImageElement).src = "/img/defaultImg.png")
          }
        />
      );
    } else return null;
  }, [playData]);

  return (
    <div
      className="control_out_wrap"
      style={playlist.length > 0 ? { display: "flex" } : { display: "none" }}
    >
      <div className="control_tower">
        <div className="control_wrap">
          <button
            className="next control"
            onClick={() => currentVideoContorl("prev")}
          >
            <img
              src="/img/skip_next_black_24dp.svg"
              alt=""
              className="rotate"
              style={{ transform: "rotate(180deg)" }}
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
            onClick={() => currentVideoContorl("next")}
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
        {playData.title !== "" ? (
          <>
            <figure>{thumbnailHanlder()}</figure>
            <figcaption>
              <p>{playData.title}</p>
              <span>{playData.singer}</span>
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
        <button
          style={{ width: 47, height: 33 }}
          onClick={() => {
            setConnect((prev) => !prev);
          }}
        >
          <img
            src={loopConnect ? "/img/oneplay.PNG" : "/img/allplay.PNG"}
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
