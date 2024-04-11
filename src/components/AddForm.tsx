import React, { useRef } from "react";
import { commonData } from "../module/interfaceModule.ts";
import { useMyContext } from "../module/MyContext.tsx";

type props = {
  setData: React.Dispatch<React.SetStateAction<commonData>>;
  setListToggle: React.Dispatch<React.SetStateAction<boolean>>;
  listopen: boolean;
  initialData: commonData;
};
function AddList({ setData, setListToggle, listopen, initialData }: props) {
  const urlRef = useRef<HTMLInputElement>(null);

  const { navigate } = useMyContext();

  function youtube_parser(params: string) {
    const regExp = /^.*(youtu.be\/.*|watch\?.*v=)([^#\&\?]*).*/;
    const match = params.match(regExp);
    if (match) {
      const result = match.filter(
        (item) => item.length === 11 || item.length === 12
      );
      if (result.length > 0) {
        return result[0].replace(/"/g, "");
      } else {
        return false;
      }
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
        console.log(createParser);
        if (createParser) {
          const resultURL = `https://youtube.com/watch?v=${createParser}`;
          try {
            const response = await geturlData(resultURL);
            const object = {
              title: response.title,
              url: response.url,
              thumbnail: response.thumbnail_url,
              singer: response.author_name,
            };
            urlRef.current.value = "";
            setData(object);
            setListToggle(false);
            navigate("/search");
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
    <div className="addform-wrap">
      <h1
        className="logo"
        style={
          listopen
            ? {
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              }
            : {
                borderRight: "1px solid rgba(255,255,255,0.12)",
              }
        }
        onClick={() => {
          setData(initialData);
          setListToggle(false);
          navigate("/");
        }}
      >
        <img src="img/on_platform_logo_dark.svg" alt="" />
      </h1>
      <div className="input_wrap">
        <img src="img/icon-search.svg" alt="" className="input-search" />
        <input
          type="text"
          placeholder="유튜브 주소를 입력해주세요."
          className="text_input url"
          name="url"
          ref={urlRef}
          onKeyPress={(e) => addPlayList(e)}
        />
      </div>
    </div>
  );
}

export default AddList;
