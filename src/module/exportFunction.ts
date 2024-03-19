import { commonData } from "./interfaceModule";
import { FavoriteAdd, ListAdd, trackUpdate } from "./reducer.ts";

export function favoriteHandler(
  data: commonData,
  favoriteState: commonData[],
  favoriteDispatch: any
) {
  if (!favoriteState.includes(data)) {
    favoriteDispatch(FavoriteAdd(data));
  }
}

export function play(
  type: string,
  track,
  playlist,
  data,
  trackDispatch,
  addDispatch,
  playDispatch,
  playState,
  setIndex
) {
  const copyTrack = [...track];
  const copyPlayList = [...playlist];
  if (type === "unshift") {
    copyPlayList.unshift(data);
    copyTrack.unshift(data.url);
    trackDispatch(trackUpdate(copyTrack, "unshift"));
    addDispatch(ListAdd(copyPlayList, "unshift"));
    setIndex(0);
  } else {
    copyPlayList.push(data);
    copyTrack.push(data.url);
    trackDispatch(trackUpdate(copyTrack, "push"));
    addDispatch(ListAdd(copyPlayList, "push"));
  }

  const loadSaveData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );
  if (loadSaveData.length === 0) {
    localStorage.setItem("saveData", JSON.stringify([data]));
  } else {
    const result = [...loadSaveData, data].filter((value, idx, arr) => {
      // value = 각각의 값 , idx = 순서 arr = 순회대상
      return (
        arr.findIndex((item) => {
          return (
            item.title === value.title &&
            item.thumbnail === value.thumbnail &&
            item.url === value.url &&
            item.singer === value.singer
          );
        }) === idx
        //비교할 대상 item과 value를 뱌교
      );
    });
    localStorage.setItem("saveData", JSON.stringify(result));
  }

  if (!playState) playDispatch(true);
}
