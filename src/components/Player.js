import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { PlayStateAction } from "../reducer/reducer";
import Audio from "./audio";
function Player({ list, playerRef, audioState, dispatch }) {
  const [track, settrack] = useState([]);
  const [thumbnail, setThumb] = useState("/img/defaultImg.png");
  const [title, setTitle] = useState("기본정보가 없습니다");
  const [loop, setLoop] = useState(false);
  const [volume, setVolume] = useState(4);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekbar, setSeekbar] = useState(0);

  window.onkeyup = function (event) {
    if (event.keyCode === 32) {
      PlayStateAction();
    }
  };

  function playIndex() {
    const player = playerRef.current.getInternalPlayer();
    const Sequence = player.playerInfo.playlistIndex;
    const listLength = Array.from(document.querySelectorAll(".list li"));
    listLength.map((value, index) => {
      if (Sequence === index) {
        return listLength[index].classList.add("index");
      } else {
        return listLength[index].classList.remove("index");
      }
    });
  }

  function playGround() {
    const player = playerRef.current.getInternalPlayer();
    const Sequence = player.playerInfo.playlistIndex;
    const videoTitle = player.videoTitle;
    let objects = {};
    objects.title = videoTitle;
    objects.thumbnail = list[Sequence].thumbnail;
    const Search = new Promise(function (res) {
      res(objects);
    });
    Search.then((result) => {
      setTitle(result.title);
      setThumb(result.thumbnail);
    });
    playIndex();
  }

  function movieControl(e) {
    if (e.target.checked) {
      document.querySelector(".player").classList.add("show");
      document.querySelector(".movie_box").classList.add("show");
      document.querySelector(".player_wrap").style.minHeight = 380;
    } else {
      document.querySelector(".player").classList.remove("show");
      document.querySelector(".movie_box").classList.add("show");
      document.querySelector(".player_wrap").style.minHeight = 455;
    }
  }

  useEffect(() => {
    if (list.length !== 0) {
      let arr = [];
      const trackAction = new Promise(function (res) {
        list.map((value, index) => {
          return arr.push(value.url);
        });
        res(arr);
      });

      trackAction.then((result) => {
        settrack(result);
      });
    }
  }, [list]);

  function handleProgress(progress) {
    setPlayed(Math.floor(progress.playedSeconds));
    setSeekbar(progress.played.toFixed(3));
  }

  function handleDuration(duration) {
    setDuration(duration - 1);
  }

  function getVolume(volume) {
    setVolume(volume);
  }

  function loopAction(loop) {
    setLoop(loop);
  }
  function handleSeekbar(seekbar) {
    setSeekbar(seekbar);
  }

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
        </div>
        <ReactPlayer
          ref={playerRef}
          playing={audioState}
          loop={loop}
          url={track}
          volume={Number(`0.${volume}`)}
          onStart={playIndex}
          onPlay={playGround}
          onDuration={handleDuration}
          onProgress={handleProgress}
          width="100%"
          className={"player"}
          height="370px"
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
      <div className="movie-toggle">
        <input
          type="checkbox"
          id="moive_check"
          onClick={(e) => movieControl(e)}
        ></input>
        <label htmlFor="movie_check">뮤비보기</label>
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
