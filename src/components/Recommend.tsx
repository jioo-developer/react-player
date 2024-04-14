import React from "react";
import { recomend_data } from "../recomend_data.ts";
import MiddleAlbum from "./albumComponent/Middle.tsx";
function Recommend() {
  return (
    <section className="recommend_wrap">
      <h2 className="mb30">추천 앨범</h2>
      <MiddleAlbum dataArr={recomend_data} round={true} />
    </section>
  );
}

export default Recommend;
