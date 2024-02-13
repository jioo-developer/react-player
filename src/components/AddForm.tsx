import React, { useRef } from "react";
import { ListAdd } from "../module/reducer";
import { useMyContext } from "../module/MyContext";

function AddList() {
  const { dispatch } = useMyContext();
  const urlRef = useRef<HTMLInputElement>(null);
  // 재생/일시정지 state

  function youtube_parser(params) {
    let regExp = /^.*((youtu.be\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = params.match(regExp);
    if (match !== null && match[4].length === 11) {
      return match[4];
    } else {
      console.log(`${params}는 맞지 않는 url 입니다.`);
      return false;
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

  async function addPlayList(e) {
    e.preventDefault();
    if (urlRef.current) {
      const url = urlRef.current.value; //61번째 줄
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
          (document.querySelector(".text_input") as HTMLInputElement).value =
            "";
        } catch (error) {
          console.log(resultURL);
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
