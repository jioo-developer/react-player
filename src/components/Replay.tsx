import React from "react";
import { commonData } from "../module/interfaceModule";
import MiddleAlbum from "./albumComponent/Middle.tsx";
function Replay() {
  const loadData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );
  return (
    <>
      {loadData.length > 0 ? (
        <section className="replay_wrap">
          <h2 className="mb30">다시 듣기</h2>
          <div className="in_wrap">
            <MiddleAlbum dataArr={loadData} />
          </div>
        </section>
      ) : null}
    </>
  );
}

export default Replay;
