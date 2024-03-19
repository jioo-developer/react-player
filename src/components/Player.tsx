import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactPlayer from "react-player";
import Audio from "./audio.tsx";
import List from "./List.tsx";
import { useMyContext } from "../module/MyContext.tsx";

type props = {
  listopen: boolean;
  setListToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

function Player({ listopen, setListToggle }: props) {
  const { playlist, track, playState, playDispatch, playIndex, setIndex } =
    useMyContext();
  const [playData, setPlayData] = useState({
    title: "",
    singer: "",
    thumbnail: "",
    url: "",
  });
  const [volume, setVolume] = useState(4);
  const [played, setPlayed] = useState(0);

  // 현재 재생중인 시점
  const [duration, setDuration] = useState(0);
  // 재생되는 개체 풀 타임
  const [seekbar, setSeekbar] = useState(0);
  // 100% 중 몇프로 진행 됐는지
  const playerRef = useRef<ReactPlayer>(null);
  const playerWrap = useRef<HTMLDivElement | null>(null);
  const playRef: ReactPlayer = playerRef.current as ReactPlayer;
  // 스페이스 누르면 일시정지 되게 하는 함수
  const [loop, setLoop] = useState(false);
  const [loopConntect, setConnect] = useState(false);
  const [modeCheck, setCheck] = useState("image");

  window.onkeyup = function (event) {
    if (event.keyCode === 32) {
      playDispatch((prev) => !prev);
    }
  };
  // 스페이스 누르면 일시정지 되게 하는 함수

  // 리스트 중 현재 재생중인 노래 index 함수

  function playSetting() {
    const player = playRef.getInternalPlayer();
    if (playRef && player) {
      const newtitle = player.videoTitle;

      const newthumbNail = playlist.filter((item) => {
        return item.url.includes(player.playerInfo.videoData.video_id);
      });
      const index = playlist.indexOf(newthumbNail[0]);
      if (playIndex !== index) {
        setIndex(index);
      }

      if (playData.title !== newtitle) {
        const newObject = {
          title: newtitle,
          singer: player.playerInfo.videoData.author || "",
          thumbnail: newthumbNail[0].thumbnail,
          url: player.playerInfo.videoUrl,
        };
        setPlayData(newObject);
      }
    }
  }

  // 리스트 중 현재 재생중인 노래 index 함수

  // 곡의 분/초에 관한 함수

  function handleProgress() {
    if (playRef) {
      const playerCurrentTime = playRef.getCurrentTime(); // 현재 재생 중인 비디오의 시간
      setPlayed(Math.floor(playerCurrentTime)); // 현재 시간을 업데이트
      const progress = playerCurrentTime / playRef.getDuration(); // 진행 상황을 계산
      const fullProgress = progress.toFixed(2) === "0.99";
      loopHandler(fullProgress);
      setSeekbar(progress); // 진행바 시점을 업데이트
    }
  }

  function handleDuration() {
    if (playRef) {
      const playerDurate = playRef.getDuration();
      setDuration(playerDurate - 1);
    }
  }

  // 곡의 풀타임 시간에 관한 함수

  function getVolume(volume: number) {
    setVolume(volume);
  }

  function handleSeekbar(seekbar: number) {
    setSeekbar(seekbar);
  }
  // 진행바에 특정 구간을 클릭시 그 값으로 시점이 이동되게 하는 함수

  function handleError() {
    playDispatch(false);
  }

  function handlePlay() {
    playDispatch(true);
  }
  function handlePause() {
    playDispatch(false);
  }

  const TimeLogic = useMemo(() => {
    return (duration: number): string => {
      const hour: number = Math.floor(duration / 3600);
      let minutes: number = Math.floor((duration - hour * 3600) / 60);
      let second: number = Math.floor(duration - hour * 3600 - minutes * 60);

      if (second >= 60) {
        minutes = minutes + Math.floor(second / 60);
        second = second % 60;
      }

      const result = [
        minutes >= 10 ? `${minutes} ` : `0${minutes}`,
        second >= 10 ? second : `0${second}`,
      ].join(":");
      return result;
    };
  }, []);

  function currentVideoContorl(direction: string) {
    if (track.length > 1) {
      if (direction === "prev") {
        if (playIndex > 0) {
          const newIndex = playIndex - 1;
          setIndex(newIndex);
        }
      } else if (direction === "next") {
        if (playIndex < track.length) {
          const newIndex = playIndex + 1;
          setIndex(newIndex);
        }
      }
    }
  }

  function loopHandler(progress) {
    if (playlist.length > 0) {
      if (loopConntect && playlist.length > 1) {
        setLoop(true);
      } else if (!loopConntect && playlist.length > 1) {
        setLoop(false);
      } else {
        setLoop(true);
      }
    }
  }
  // api에 나온 시점을 분 초 로 계산하는 함수

  function modeChange(type?: string) {
    if (modeCheck !== type && type) {
      setCheck(type);
    }
  }

  useEffect(() => {
    if (playerWrap.current) {
      const elArray = Array.from(playerWrap.current.children);

      const styleSetting = (className: string) => {
        elArray.forEach((item) => {
          if (item.classList.contains(className)) {
            item.classList.add("on");
          } else {
            item.classList.remove("on");
          }
        });
      };
      if (modeCheck === "image") {
        styleSetting("ref_thumbnail");
      } else {
        styleSetting("player");
      }
    }
  }, [modeCheck]);

  useEffect(() => {
    modeChange();
  }, []);

  return (
    <>
      <div
        className="play"
        style={listopen ? { display: "flex" } : { display: "none" }}
      >
        <div className="ref_player_wrap">
          <div className="radio_wrap">
            <input
              type="radio"
              id="modechange"
              className="videoMode"
              name="video"
              value="image"
              checked={modeCheck === "image"}
              onChange={() => modeChange("image")}
            />
            <label htmlFor="modechange">노래</label>
            <input
              type="radio"
              id="modechange2"
              className="videoMode"
              name="video"
              value="video"
              checked={modeCheck === "video"}
              onChange={() => modeChange("video")}
            />
            <label htmlFor="modechange2">동영상</label>
          </div>
          <div className="ref-video-wrap" ref={playerWrap}>
            <figure className="ref_thumbnail">
              <img src={playData.thumbnail} alt="" />
            </figure>
            <ReactPlayer
              ref={playerRef}
              playing={playState}
              loop={loop}
              url={track[playIndex]}
              volume={Number(`0.${volume}`)}
              onStart={() => playSetting()}
              onPlay={() => {
                playSetting();
                handleProgress();
                handleDuration();
                handlePlay();
              }}
              onDuration={handleDuration}
              onError={handleError}
              onProgress={handleProgress}
              onPause={handlePause}
              onEnded={() => {
                if (!loopConntect) {
                  setIndex((prev) => prev + 1);
                }
              }}
              className={"player"}
              controls={true}
              config={{
                youtube: {
                  playerVars: {
                    rel: 0,
                    modestbranding: 1,
                  },
                },
              }}
            />
          </div>
        </div>
        {listopen ? <List playData={playData} /> : null}
      </div>
      <Audio
        playData={playData}
        volume={volume}
        getVolume={getVolume}
        played={played}
        TimeLogic={TimeLogic}
        loopConnect={loopConntect}
        setListToggle={setListToggle}
        listopen={listopen}
        seekbar={seekbar}
        duration={duration}
        currentVideoContorl={currentVideoContorl}
        handleSeekbar={handleSeekbar}
        setConnect={setConnect}
        playRef={playRef}
      />
    </>
  );
}

export default Player;
