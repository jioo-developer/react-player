import React, { useEffect } from "react";
import Replay from "../components/Replay.tsx";
import RandomList from "../components/RandomList.tsx";
import Favorite from "../components/Favorite.tsx";
import Recommend from "../components/Recommend.tsx";
type props = {
  vw: number;
  setvw: React.Dispatch<React.SetStateAction<number>>;
  listopen: boolean;
};

function Home({ vw, setvw, listopen }: props) {
  function updatevW() {
    const newVW = window.innerWidth * 1;
    const parentWidth = Array.from(
      document.querySelectorAll(".in_wrap")
    ) as HTMLElement[];
    if (parentWidth && parentWidth.length > 0) {
      parentWidth.forEach((item) => {
        if (item.classList.contains("small")) {
          if (newVW < 1000) {
            item.style.overflowX = "scroll";
          } else {
            item.style.overflowX = "visible";
          }
        } else {
          if (newVW < 1600) {
            item.style.overflowX = "scroll";
          } else {
            item.style.overflowX = "visible";
          }
        }
      });
    }
    setvw(newVW);
  }

  useEffect(() => {
    updatevW();
    window.addEventListener("resize", updatevW);
    return () => {
      window.removeEventListener("resize", updatevW);
    };
  }, []);
  return (
    <>
      {!listopen ? (
        <div className="home">
          <Replay />
          <RandomList />
          <Favorite />
          <Recommend />
        </div>
      ) : null}
    </>
  );
}

export default Home;
