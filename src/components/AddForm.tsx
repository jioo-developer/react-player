import React, { useRef } from "react";
import { ListAdd } from "../module/reducer";
import { useMyContext } from "../module/MyContext";

function AddList() {
  const { dispatch } = useMyContext();
  const urlRef = useRef<HTMLInputElement>(null);
  // 재생/일시정지 state

  function youtube_parser(params: string) {
    let regExp = /^.*((youtu.be\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = params.match(regExp);
    if (match !== null && match[4].length === 11) {
      return match[4];
    } else {
      console.log(`${params}는 맞지 않는 url 입니다.`);
      return false;
    }
  }

  function geturlData(value: string) {
    const response = fetch(
      "https://noembed.com/embed??" +
        new URLSearchParams({
          format: "json",
          url: value,
        })
    );
    return response.then((res) => res.json());
  }

  async function addPlayList() {
    if (urlRef.current) {
      const url: string = urlRef.current.value;
      const createParser = youtube_parser(url);
      if (createParser) {
        const resultURL = `https://youtube.com/watch?v=${createParser}`;
        try {
          const response = await geturlData(resultURL);
          const object = {
            title: response.title,
            url: response.url,
            thumbnail: response.thumbnail_url,
          };
          dispatch(ListAdd(object));
          urlRef.current.value = "";
        } catch (error) {
          console.log(resultURL);
          console.log(error);
          console.log("------------------------------");
        }
      } else {
        console.log(createParser);
        console.log("---------------------------------");
      }
    }
  }

  return (
    <div className="input_wrap">
      <p>곡 검색</p>
      <div className="form">
        <input
          type="text"
          placeholder="유튜브 주소를 입력해주세요"
          className="text_input url"
          name="url"
          ref={urlRef}
        ></input>
        <button onClick={addPlayList}>추가</button>
      </div>
    </div>
  );
}

export default AddList;
