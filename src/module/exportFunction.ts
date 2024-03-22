import { Action } from "redux";
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
  track: string[],
  playlist: commonData[],
  data: any,
  trackDispatch: React.Dispatch<Action>,
  addDispatch: React.Dispatch<Action>,
  playDispatch: React.Dispatch<React.SetStateAction<boolean>>,
  playState: boolean,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  group?: string[]
) {
  const copyTrack = [...track];
  const copyPlayList = [...playlist];
  if (type === "unshift") {
    if (group && group.length > 0) {
      const groupTrack = [...track, ...group];
      const groupList = [...playlist, ...data];
      trackDispatch(trackUpdate(groupTrack, "unshift"));
      addDispatch(ListAdd(groupList, "unshift"));
    } else {
      copyPlayList.unshift(data);
      copyTrack.unshift(data.url);
      trackDispatch(trackUpdate(copyTrack, "unshift"));
      addDispatch(ListAdd(copyPlayList, "unshift"));
    }
    setIndex(0);
  } else {
    if (group && group.length > 0) {
      const groupTrack = [...track, ...data];
      const groupList = [...playlist, ...data];
      trackDispatch(trackUpdate(groupTrack, "push"));
      addDispatch(ListAdd(groupList, "push"));
    } else {
      copyPlayList.push(data);
      copyTrack.push(data.url);
      trackDispatch(trackUpdate(copyTrack, "push"));
      addDispatch(ListAdd(copyPlayList, "push"));
    }
  }

  const loadSaveData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );
  if (Array.isArray(loadSaveData)) {
    if (loadSaveData.length === 0) {
      localStorage.setItem("saveData", JSON.stringify([data]));
    } else {
      const resultArray = [...loadSaveData, data];
      const result = resultArray.filter((value, idx, arr) => {
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
  }

  if (!playState) playDispatch(true);
}
