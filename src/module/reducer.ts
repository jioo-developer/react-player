const initialState = {
  playlist: [],
  favoriteData: [],
  playState: false,
  track: [],
};

const ADDLIST = "ADDLIST";
const FAVORITE = "FAVORITE";
const Remove = "Remove";
const playState = "playState";
const track = "track";

export const ListAdd = (data: any) => ({
  type: ADDLIST,
  data,
});

export const trackUpdate = (data: any) => ({
  type: track,
  data,
});

//앨범에 트랙 추가 함수

export const FavoriteAdd = (data: any) => ({
  type: FAVORITE,
  data,
});

//즐겨찾기 추가 함수

export const removeFavorite = (data: any) => ({
  type: Remove,
  data,
});

// 즐겨찾기 삭제 함수

export const PlayStateAction = () => ({
  type: playState,
});

// 재생/일시중지 함수

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ADDLIST:
      const stateCheck: commonData[] = Array.isArray(action.data)
        ? [...state.playlist, ...action.data]
        : [...state.playlist, action.data];
      const filterList = stateCheck.filter((value, idx, arr) => {
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

    case track:
      return {
        ...state,
        track: action.data,
      };

    case FAVORITE:
      const favoritestateCheck = state.favoriteData.concat(action.data);
      const filterState = favoritestateCheck.filter((value, idx, arr) => {
        return (
          arr.findIndex((item) => {
            return (
              item.id === value.id &&
              item.url === value.url &&
              item.title === value.title
            );
          }) === idx
        );
      });
      localStorage.setItem("favoriteName", JSON.stringify(filterState));
      return {
        ...state,
        favoriteData: filterState,
      };

    case Remove:
      localStorage.removeItem("favoriteName");
      localStorage.setItem("FavoriteName", JSON.stringify(action.data));
      return {
        ...state,
        favoriteData: action.data,
      };

    case playState:
      return {
        ...state,
        playState: !state.playState,
      };

    default:
      return state;
  }
}
