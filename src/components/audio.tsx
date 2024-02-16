import { ListAdd, PlayStateAction, trackUpdate } from "../module/reducer";
import { useMyContext } from "../module/MyContext";
import ReactPlayer from "react-player";

type audioProps = {
  volume: number;
  audioState: boolean;
  getVolume: (params: number) => void;
  handleSeekbar: (params: number) => void;
  played: number;
  duration: number;
  TimeLogic: (parmas: number) => string;
  seekbar: number;
  playRef: ReactPlayer | null;
};

function Audio({
  volume,
  audioState,
  getVolume,
  played,
  duration,
  TimeLogic,
  seekbar,
  handleSeekbar,
  playRef,
}: audioProps) {
  const { dispatch } = useMyContext();
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

  return (
    <div className="control_out_wrap">
      <div className="control_tower">
        <div className="control_wrap">
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
            onClick={() => {
              if (playRef) playRef.seekTo(999);
            }}
          >
            <img src="/img/skip_next_black_24dp.svg" alt="" />
          </button>
          {audioState && played !== duration ? (
            <button
              className="toggle control"
              onClick={() => dispatch(PlayStateAction())}
            >
              <img src="/img/pause_black_24dp.svg" alt="중지" />
            </button>
          ) : (audioState && played === duration) ||
            (!audioState && played === duration) ||
            (!audioState && played !== duration) ? (
            <button
              className="toggle control"
              onClick={() => dispatch(PlayStateAction())}
            >
              <img src="/img/play_arrow_black_24dp.svg" alt="재생" />
            </button>
          ) : null}
        </div>
        <div className="time_wrap">
          <p className="load_time">{TimeLogic(played)}</p>
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
          <p className="full_time">{TimeLogic(duration)}</p>
        </div>
      </div>
    </div>
  );
}

export default Audio;
