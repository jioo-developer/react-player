import React from "react";
import { commonData, group } from "../module/interfaceModule.ts";
import { useMyContext } from "../module/MyContext.tsx";

type props = {
  setData: React.Dispatch<React.SetStateAction<commonData>>;
  setListToggle: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: commonData;
  listopen: boolean;
};

function Aside({ setData, setListToggle, initialData, listopen }: props) {
  const loadGroupList: group[] = JSON.parse(
    localStorage.getItem("listGroup") || "[]"
  );

  const { navigate, play } = useMyContext();

  function playGroupList(index: number) {
    const data = loadGroupList[index].dataArr;
    const trackArr = loadGroupList[index].dataArr.map((item) => item.url);
    play(data, "unshift", trackArr);
  }

  return (
    <aside>
      <header>
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
      </header>
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
