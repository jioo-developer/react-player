import React, { useRef } from "react";
import { batch, useSelector } from "react-redux";
import { ListAdd, PlayStateAction } from "../reducer/reducer";

function AddList({ dispatch }) {
  const urlRef = useRef();
  const audioState = useSelector((state) => state.playState);
  // 재생/일시정지 state
  async function addPlayList(e) {
    e.preventDefault();
    const url = urlRef.current.value; //58번째 줄
    const createParser = youtube_parser(url);
    const resultURL = `https://youtube.com/watch?v=${createParser}`;
    try {
      const response = await geturlData(resultURL);
      const object = {
        title: response.title,
        url: response.url,
        thumbnail: response.thumbnail_url,
      };
      batch(() => {
        dispatch(ListAdd(object));
        if (!audioState) dispatch(PlayStateAction());
      });
      document.querySelector(".text_input").value = "";
    } catch (error) {
      console.log(error);
    }
  }

  function youtube_parser(params) {
    let regExp = /^.*((youtu.be\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = params.match(regExp);
    if (match !== null && match[4].length === 11) {
      return match[4];
    }
  }

  function geturlData(value) {
    const response = fetch(
      "https://noembed.com/embed??" +
        new URLSearchParams({
          format: "json",
          url: value,
        })
    );
    return response.then((res) => res.json());
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
        <button onClick={(e) => addPlayList(e)}>추가</button>
      </form>
    </div>
  );
}

export default AddList;
