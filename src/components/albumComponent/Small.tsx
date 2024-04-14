import React from "react";
import { useMyContext } from "../../module/MyContext.tsx";
import { commonData } from "../../module/interfaceModule";
const SmallAlbum = ({ dataArr }: { dataArr: commonData[] }) => {
  const { play } = useMyContext();
  return (
    <div className="small_album">
      {dataArr.length > 0
        ? dataArr.map((item, index) => {
            return (
              <article key={index} onClick={() => play(item, "unshift")}>
                <figure>
                  <img src={`${item.thumbnail}`} alt="" />
                </figure>
                <figcaption>
                  <p>{item.title}</p>
                  <span>{item.singer}</span>
                </figcaption>
              </article>
            );
          })
        : null}
    </div>
  );
};
export default SmallAlbum;
