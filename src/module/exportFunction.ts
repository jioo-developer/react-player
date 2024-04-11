import { commonData } from "./interfaceModule";
import { FavoriteAdd } from "./reducer.ts";

export function favoriteHandler(
  data: commonData,
  favoriteState: commonData[],
  favoriteDispatch: any
) {
  if (!favoriteState.includes(data)) {
    favoriteDispatch(FavoriteAdd(data));
  }
}

export function miniPlayer() {
  const location = window.location.pathname;

  if (location === "/") {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 3000);
  }
}

export function saveDataHandler(data: any, group?: string[]) {
  const loadSaveData: commonData[] = JSON.parse(
    localStorage.getItem("saveData") || "[]"
  );
  if (Array.isArray(loadSaveData)) {
    if (loadSaveData.length === 0) {
      if (group) {
        localStorage.setItem("saveData", JSON.stringify(data));
      } else {
        localStorage.setItem("saveData", JSON.stringify([data]));
      }
    } else {
      let resultArray;
      if (group) {
        resultArray = [...loadSaveData, ...data];
      } else {
        resultArray = [...loadSaveData, data];
      }
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
}
