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
  playState
) {
  const copyTrack = [...track];
  const copyPlayList = [...playlist];
  if (type === "unshift") {
    copyPlayList.unshift(data);
    copyTrack.unshift(data.url);
  } else {
    copyPlayList.push(data);
    copyTrack.push(data.url);
  }

  const loadSaveData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );
  if (loadSaveData.length === 0) {
    localStorage.setItem("saveData", JSON.stringify([data]));
  } else {
    const result = loadSaveData.push(data);
    localStorage.setItem("saveData", JSON.stringify(result));
  }

  trackDispatch(trackUpdate(copyTrack));
  addDispatch(ListAdd(copyPlayList));
  if (!playState) playDispatch(true);
}
