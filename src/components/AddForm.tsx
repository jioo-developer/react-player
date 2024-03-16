import React, { useEffect, useRef, useState } from "react";
import { commonData } from "../module/interfaceModule.ts";

type props = {
  setData: React.Dispatch<React.SetStateAction<commonData>>;
  vw: number;
  searchToggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
function AddList({ setData, vw, searchToggle, setToggle }: props) {
  const urlRef = useRef<HTMLInputElement>(null);

  function youtube_parser(params: string) {
    const regExp = /^.*(youtu.be\/.*|watch\?.*v=)([^#\&\?]*).*/;
    const match = params.match(regExp);
    if (match) {
      const result = match.filter(
        (item) => item.length === 11 || item.length === 12
      );
      return result[0].replace(/"/g, "");
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

  async function addPlayList(e: React.KeyboardEvent<HTMLInputElement>) {
    if (urlRef.current) {
      const url: string = urlRef.current.value;
      if (typeof e === "object" && e.key === "Enter" && url !== "") {
        const createParser = youtube_parser(url);
        if (createParser) {
          const resultURL = `https://youtube.com/watch?v=${createParser}`;
          try {
            const response = await geturlData(resultURL);
            console.log(response);
            const object = {
              title: response.title,
              url: response.url,
              thumbnail: response.thumbnail_url,
              singer: response.author_name,
            };
            urlRef.current.value = "";
            setData(object);
            // addDispatch(ListAdd(object));
            // trackDispatch(trackUpdate(object.url));
            // if (!playState) playDispatch(true);
          } catch (error) {
            console.log("------------------------------");
            window.alert("url 정보를 찾지 못했습니다.");
          }
        } else {
          console.log(createParser);
          window.alert("url 정보를 찾지 못했습니다.");
          console.log("---------------------------------");
        }
      }
    }
  }

  return (
    <>
      {vw > 700 || (vw < 700 && searchToggle) ? (
        <div
          className="input_wrap"
          style={vw < 700 && searchToggle ? { width: "93%" } : {}}
        >
          <img src="img/icon-search.svg" alt="" className="input-search" />
          <input
            type="text"
            placeholder="유튜브 주소를 입력해주세요 (제목X)"
            className="text_input url"
            name="url"
            ref={urlRef}
            onKeyPress={(e) => addPlayList(e)}
            onMouseLeave={() => {
              if (vw < 700 && searchToggle) {
                setToggle(false);
              }
            }}
          />
        </div>
      ) : vw < 700 && !searchToggle ? (
        <img
          src="img/icon-search.svg"
          alt=""
          className="input-search"
          style={{
            marginLeft: "auto",
            marginRight: 30,
            filter: "grayScale(1)",
            cursor: "pointer",
          }}
          onClick={() => setToggle(true)}
        />
      ) : null}
    </>
  );
}

export default AddList;
