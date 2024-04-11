import { Action, commonData, group, stateType } from "./interfaceModule";

export const initialState: stateType = {
  playlist: [],
  favoriteData: [],
  track: [],
  playState: false,
  groupTrack: [],
};

const ADDLIST = "ADDLIST";
const FAVORITE = "FAVORITE";
const Remove = "Remove";
const playState = "playState";
const track = "track";
const changeTrack = "changeTrack";
const groupAdd = "groupAdd";

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

export const FavoriteAdd = (data: commonData[] | commonData) => ({
  type: FAVORITE,
  data,
});

export const removeFavorite = (data: commonData[]) => ({
  type: Remove,
  data,
});

export const addGroup = (data: group[]) => ({
  type: groupAdd,
  data,
});

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
        track: action.data,
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

    case groupAdd:
      return {
        ...state,
        groupTrack: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
