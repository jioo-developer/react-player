import { Action, commonData, stateType } from "./interfaceModule";

export const initialState: stateType = {
  playlist: [],
  favoriteData: [],
  track: [],
  playState: false,
};

const ADDLIST = "ADDLIST";
const FAVORITE = "FAVORITE";
const Remove = "Remove";
const playState = "playState";
const track = "track";
const changeTrack = "changeTrack";

export const ListAdd = (
  data: commonData | commonData[],
  direction: string
) => ({
  type: ADDLIST,
  data,
  direction,
});

export const trackUpdate = (data: string | string[], direction: string) => ({
  type: track,
  data,
  direction,
});

//앨범에 트랙 추가 함수

export const FavoriteAdd = (data: commonData[] | commonData) => ({
  type: FAVORITE,
  data,
});

//즐겨찾기 추가 함수

export const removeFavorite = (data: commonData[]) => ({
  type: Remove,
  data,
});

// 즐겨찾기 삭제 함수

// 재생/일시중지 함수

export const ChangeList = (data: commonData[]) => ({
  type: changeTrack,
  data,
});

const reducer = (state: stateType, action: Action): stateType => {
  switch (action.type) {
    case ADDLIST:
      const addplay = () => {
        if (Array.isArray(action.data)) {
          if (action.direction && action.direction === "unshift") {
            return [...action.data, ...state.playlist];
          } else if (action.direction && action.direction === "push") {
            return [...state.playlist, ...action.data];
          } else {
            return [...state.playlist, ...action.data];
          }
        } else {
          if (action.direction && action.direction === "unshift") {
            return [action.data, ...state.playlist];
          } else if (action.direction && action.direction === "push") {
            return [...state.playlist, action.data];
          } else {
            return [...state.playlist, action.data];
          }
        }
      };

      const filterList = addplay().filter((value, idx, arr) => {
        return (
          arr.findIndex((item) => {
            return item.url === value.url;
          }) === idx
        );
      });
      return {
        ...state,
        playlist: filterList,
      };

    case changeTrack:
      return {
        ...state,
        playlist: action.data,
      };

    case track:
      return {
        ...state,
        track:
          typeof action.data === "string"
            ? [...state.track, action.data]
            : action.data,
      };

    case FAVORITE:
      const favoritestateCheck: commonData[] | commonData = Array.isArray(
        action.data
      )
        ? [...state.favoriteData, ...action.data]
        : [...state.favoriteData, action.data];
      const filterState: commonData[] = favoritestateCheck.filter(
        (value, idx, arr) => {
          return (
            arr.findIndex((item) => {
              return (
                item.id === value.id &&
                item.url === value.url &&
                item.title === value.title &&
                item.thumbnail === value.thumbnail
              );
            }) === idx
          );
        }
      );
      localStorage.setItem("FavoriteName", JSON.stringify(filterState));
      return {
        ...state,
        favoriteData: filterState,
      };

    case Remove:
      localStorage.removeItem("FavoriteName");
      if (action.data.length > 0) {
        localStorage.setItem("FavoriteName", JSON.stringify(action.data));
      }
      return {
        ...state,
        favoriteData: action.data,
      };

    case playState:
      return {
        ...state,
        playState: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
