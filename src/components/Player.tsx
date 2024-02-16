import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { PlayStateAction } from "../module/reducer";
import Audio from "./audio";
import { useMyContext } from "../module/MyContext";

type playerProps = {
  audioState: boolean;
  playlist: commonData[];
  track: string[];
};

function Player({ audioState, playlist, track }: playerProps) {
  const { dispatch } = useMyContext();
  // 현재 썸네일 이미지
  const [title, setTitle] = useState<string | undefined>("");
  // 현재 재생중인 노래 타이틀
  const [volume, setVolume] = useState(4);
  const [played, setPlayed] = useState(0);
  const [nowVideo, setNow] = useState<string[]>([]);
  // 현재 재생중인 시점
  const [duration, setDuration] = useState(0);
  // 재생되는 개체 풀 타임
  const [seekbar, setSeekbar] = useState(0);
  // 100% 중 몇프로 진행 됐는지
  const playerRef = useRef<ReactPlayer>(null);
  const playRef: ReactPlayer | null = playerRef.current;
  const [movieToggle, setMovie] = useState(false);
  useEffect(() => {
    let playRef = playerRef.current;
    if (!playRef) {
      playRef = playerRef.current;
    }
  }, [playRef]);

  // 스페이스 누르면 일시정지 되게 하는 함수
  window.onkeyup = function (event) {
    if (event.keyCode === 32) {
      dispatch(PlayStateAction());
    }
  };
  // 스페이스 누르면 일시정지 되게 하는 함수

  // 리스트 중 현재 재생중인 노래 index 함수

  function playSetting() {
    setTimeout(() => {
      setMovie(true);
    }, 500);
    if (playRef) {
      const player = playRef.getInternalPlayer();
      setNow(player.playerInfo.videoUrl);
      const Sequence: number = player.playerInfo.playlistIndex;
      const videoTitle: string = player.videoTitle;
      const listLength: Element[] = Array.from(
        document.querySelectorAll(".lists li") || []
      );
      if (listLength.length > 0) {
        listLength.map((value, index) => {
          //value 지우면 함수 작동이 안되기에 그냥 써놓는거
          if (Sequence === index) {
            return value.classList.add("index");
          } else {
            return value.classList.remove("index");
          }
        });
      }
      playGround(Sequence, videoTitle);
    }
  }

  // 리스트 중 현재 재생중인 노래 index 함수

  // 현재 재생중인 노래의 썸네일과 타이틀 함수
  function playGround(Sequence: number, videoTitle: string): void {
    const listElement = playlist[Sequence];
    if (listElement) {
      const objects = {
        title: videoTitle,
        thumbnail: listElement.thumbnail,
      };
      setTitle(objects.title);
    }
  }
  // 현재 재생중인 노래의 썸네일과 타이틀 함수

  // 곡의 분/초에 관한 함수

  function handleProgress() {
    if (playRef) {
      const playerCurrentTime = playRef.getCurrentTime(); // 현재 재생 중인 비디오의 시간
      setPlayed(Math.floor(playerCurrentTime)); // 현재 시간을 업데이트
      const progress = playerCurrentTime / playRef.getDuration(); // 진행 상황을 계산
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
    dispatch(PlayStateAction());
  }

  function TimeLogic(duration: number): string {
    let hour: number = Math.floor(duration / 3600);
    let minutes: string | number = Math.floor((duration - hour * 3600) / 60);
    let second: string | number = duration - hour * 3600 - minutes * 60;
    const condition = (params: string | number) =>
      typeof params === "number" && params < 10;

    if (condition(minutes)) {
      minutes = `0${minutes}`;
    } else {
      minutes = Math.ceil(minutes);
    }
    if (condition(second)) {
      second = `0${Math.ceil(second as number)}`;
    } else {
      second = Math.ceil(second);
    }

    return `${minutes} : ${second}`;
  }

  // api에 나온 시점을 분 초 로 계산하는 함수

  return (
    <>
      <div className="play">
        <div className="movie_box">
          <ReactPlayer
            ref={playerRef}
            playing={audioState}
            loop={true}
            url={track}
            volume={Number(`0.${volume}`)}
            onStart={() => {
              playSetting();
            }}
            onPlay={() => {
              playSetting();
              handleProgress();
              handleDuration();
            }}
            onDuration={handleDuration}
            onError={handleError}
            onProgress={handleProgress}
            width="100%"
            className={"player"}
            height="100%"
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
          {!movieToggle ? (
            <div
              className="playing"
              style={{ backgroundImage: "url(/img/defaultImg.png" }}
            ></div>
          ) : null}
          <figcaption>{title}</figcaption>
        </div>
      </div>
      <Audio
        volume={volume}
        audioState={audioState}
        getVolume={getVolume}
        played={played}
        TimeLogic={TimeLogic}
        seekbar={seekbar}
        duration={duration}
        handleSeekbar={handleSeekbar}
        playRef={playRef}
      />
    </>
  );
}

export default Player;
