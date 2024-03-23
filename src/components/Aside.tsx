import React from "react";
import { commonData, group } from "../module/interfaceModule.ts";
import { useMyContext } from "../module/MyContext.tsx";
import { play } from "../module/exportFunction.ts";

type props = {
  vw: number;
  searchToggle: boolean;
  setData: React.Dispatch<React.SetStateAction<commonData>>;
  setListToggle: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: commonData;
  listopen: boolean;
};

function Aside({
  vw,
  searchToggle,
  setData,
  setListToggle,
  initialData,
  listopen,
}: props) {
  const loadGroupList: group[] = JSON.parse(
    localStorage.getItem("listGroup") || "[]"
  );

  const {
    track,
    playlist,
    trackDispatch,
    addDispatch,
    playDispatch,
    playState,
    setIndex,
    navigate,
  } = useMyContext();

  function playGroupList(index: number) {
    const data = loadGroupList[index].dataArr;
    const trackArr = loadGroupList[index].dataArr.map((item) => item.url);
    play(
      "unshift",
      track,
      playlist,
      data,
      trackDispatch,
      addDispatch,
      playDispatch,
      playState,
      setIndex,
      trackArr
    );
  }

  return (
    <aside>
      {(vw < 700 && !searchToggle) || vw > 700 ? (
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
      ) : null}
      <div className="aside_inwrap">
        <p>내 재생목록</p>
        <ul>
          {loadGroupList.length > 0
            ? loadGroupList.map((item, index) => {
                return (
                  <li onClick={() => playGroupList(index)} key={index}>
                    {item.title}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
