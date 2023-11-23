import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { PlayStateAction } from "../reducer/reducer";
import Audio from "./audio";

function Player({ dispatch }) {
  const list = useSelector((state) => state.playlist);
  // 플레이리스트 state list

  const track = useSelector((state) => state.track);
  //트랙

  const [thumbnail, setThumb] = useState("/img/defaultImg.png");
  // 현재 썸네일 이미지
  const [title, setTitle] = useState("기본정보가 없습니다");
  // 현재 재생중인 노래 타이틀
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(4);
  const [played, setPlayed] = useState(0);
  // 현재 재생중인 시점
  const [duration, setDuration] = useState(0);
  // 재생되는 개체 풀 타임
  const [seekbar, setSeekbar] = useState(0);
  // 100% 중 몇프로 진행 됐는지

  const audioState = useSelector((state) => state.playState);
  // 재생 / 일시정지

  const playerRef = useRef();

  // 스페이스 누르면 일시정지 되게 하는 함수
  window.onkeyup = function (event) {
    if (event.keyCode === 32) {
      dispatch(PlayStateAction());
    }
  };
  // 스페이스 누르면 일시정지 되게 하는 함수

  // 현재 재생중인 노래의 썸네일과 타이틀 함수

  // 리스트 중 현재 재생중인 노래 index 함수

  function playSetting() {
    const player = playerRef.current.getInternalPlayer();
    const Sequence = player.playerInfo.playlistIndex;
    const videoTitle = player.videoTitle;
    const listLength = Array.from(document.querySelectorAll(".lists li"));
    listLength.map((value, index) => {
      console.log(value);
      //value 지우면 함수 작동이 안되기에 그냥 써놓는거
      if (Sequence === index) {
        return listLength[index].classList.add("index");
      } else {
        return listLength[index].classList.remove("index");
      }
    });
    playGround(Sequence, videoTitle);
  }

  // 리스트 중 현재 재생중인 노래 index 함수

  // 현재 재생중인 노래의 썸네일과 타이틀 함수

  function playGround(Sequence, videoTitle) {
    let objects = {};
    objects.title = videoTitle;
    objects.thumbnail = list[Sequence].thumbnail;

    setTitle(objects.title);
    setThumb(objects.thumbnail);
  }
  // 현재 재생중인 노래의 썸네일과 타이틀 함수

  // 뮤비보기 누르면 활성화 되는 on / off

  function movieControl(e) {
    if (e.target.checked) {
      document.querySelector(".player").classList.add("show");
    } else {
      document.querySelector(".player").classList.remove("show");
    }
  }

  // 뮤비보기 누르면 활성화 되는 on / off

  // 곡의 분/초에 관한 함수

  function handleProgress(progress) {
    if (progress !== undefined) {
      setPlayed(Math.floor(progress.playedSeconds));
      //현재 시점을 state로 전송
      setSeekbar(progress.played.toFixed(3));
      // 현재 진행바 시점을 전송
    } else {
      const playerSecond = playerRef.current.getCurrentTime();
      setPlayed(Math.floor(playerSecond));
    }
  }

  // 곡의 분/초에 관한 함수

  function handleDuration(duration) {
    if (duration !== undefined) {
      setDuration(duration - 1);
    } else {
      const playerDurate = playerRef.current.getDuration();
      setDuration(playerDurate - 1);
    }
  }

  // 곡의 풀타임 시간에 관한 함수

  function getVolume(volume) {
    setVolume(volume);
  }

  function loopAction(loop) {
    setLoop(loop);
  }
  function handleSeekbar(seekbar) {
    setSeekbar(seekbar);
  }
  // 진행바에 특정 구간을 클릭시 그 값으로 시점이 이동되게 하는 함수

  function date(duration) {
    let hour = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - hour * 3600) / 60);
    var second = duration - hour * 3600 - minutes * 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }

    return ` ${minutes} : ${
      second < 10 ? `0${Math.ceil(second)}` : Math.ceil(second)
    }`;
  }

  // api에 나온 시점을 분 초 로 계산하는 함수

  return (
    <div className="play">
      <div className="player_wrap">
        <div className="movie_box">
          <div className="playing">
            <figure className="playing-thumbnail">
              <img src={thumbnail} alt="" />
            </figure>
            <figcaption>{title}</figcaption>
          </div>
          <div className="movie-toggle">
            <input
              type="checkbox"
              id="moive_check"
              onClick={(e) => movieControl(e)}
            ></input>
            <label htmlFor="movie_check">뮤비보기</label>
          </div>
        </div>
        <ReactPlayer
          ref={playerRef}
          playing={audioState}
          loop={loop}
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
          onProgress={handleProgress}
          width="100%"
          className={"player"}
          height="100%"
          controls={true}
          style={{ opacity: "0" }}
          config={{
            youtube: {
              playerVars: {
                rel: 0,
                modestbranding: 1,
              },
            },
          }}
        />
        <div className="done-container"></div>
      </div>
      <Audio
        dispatch={dispatch}
        volume={volume}
        audioState={audioState}
        loop={loop}
        getVolume={getVolume}
        loopAction={loopAction}
        played={played}
        date={date}
        seekbar={seekbar}
        duration={duration}
        handleSeekbar={handleSeekbar}
        playerRef={playerRef}
      />
    </div>
  );
}

export default Player;
