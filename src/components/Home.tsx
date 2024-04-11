import React, { useEffect } from "react";
import Replay from "../components/Replay.tsx";
import RandomList from "../components/RandomList.tsx";
import Favorite from "../components/Favorite.tsx";
import Recommend from "../components/Recommend.tsx";

function Home({ listopen }: { listopen: boolean }) {
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
