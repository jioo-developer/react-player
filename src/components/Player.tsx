import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactPlayer from "react-player";
import Audio from "./audio.tsx";
import { useMyContext } from "../module/MyContext.tsx";

function Player() {
  const { playlist, track, playState, playDispatch } = useMyContext();
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
  const playRef: ReactPlayer = playerRef.current as ReactPlayer;
  // 스페이스 누르면 일시정지 되게 하는 함수
  const [loop, setLoop] = useState(false);

  window.onkeyup = function (event) {
    if (event.keyCode === 32) {
      playDispatch((prev) => !prev);
    }
  };
  // 스페이스 누르면 일시정지 되게 하는 함수

  // 리스트 중 현재 재생중인 노래 index 함수

  function playSetting() {
    if (playRef) {
      console.log("실행 playSetting");
      const player = playRef.getInternalPlayer();
      const Sequence: number = player.playerInfo.playlistIndex;
      const newtitle = player.videoTitle;

      if (playData.title !== newtitle) {
        console.log(playlist);
        const newObject = {
          title: newtitle,
          singer: playlist[Sequence].singer || "",
          thumbnail: playlist[Sequence].thumbnail,
          url: playlist[Sequence].url,
        };
        console.log(newObject);
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
      if (playlist.length === 1 && progress.toFixed(2) === "0.99") {
        setLoop(true);
      }
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

  // api에 나온 시점을 분 초 로 계산하는 함수

  return (
    <>
      <div className="play">
        <div className="movie_box">
          <ReactPlayer
            ref={playerRef}
            playing={playState}
            loop={loop}
            url={track}
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
      <Audio
        playData={playData}
        volume={volume}
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
