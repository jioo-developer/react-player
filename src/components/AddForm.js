import React, { useRef } from "react";
import { batch } from "react-redux";
import { ListAdd, PlayStateAction } from "../reducer/reducer";

function AddList({ dispatch, audioState }) {
  const urlRef = useRef();
  function youtube_parser(params) {
    let regExp = /^.*((youtu.be\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = params.match(regExp);
    return match[4].length === 11 ? match[4] : false;
  }

  function addPlayList(e) {
    e.preventDefault();
    const UserInput = urlRef.current.value;
    const resultURL = `https://youtube.com/watch?v=${youtube_parser(
      UserInput
    )}`;

    fetch(
      "https://noembed.com/embed??" +
        new URLSearchParams({
          format: "json",
          url: resultURL,
        })
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        let result = {
          title: json.title,
          url: json.url,
          thumbnail: json.thumbnail_url,
        };
        batch(() => {
          dispatch(ListAdd(result));
          if (audioState !== true) {
            dispatch(PlayStateAction());
          }
        });
      });
    document.querySelector(".playlist").classList.add("padding-on");
  }

  return (
    <div className="input_wrap">
      <p>곡 검색</p>
      <form>
        <input
          type="text"
          placeholder="유튜브 주소를 입력해주세요"
          className="text_input url"
          name="url"
          ref={urlRef}
        ></input>
        <button onClick={(e) => addPlayList(e)} style={{ cursor: "pointer" }}>
          추가
        </button>
      </form>
    </div>
  );
}

export default AddList;
