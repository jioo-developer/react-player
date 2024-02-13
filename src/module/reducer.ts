const initialState: reducerType = {
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

export const ListAdd = (data: favoriteType[]) => ({
  type: ADDLIST,
  data,
});

export const trackUpdate = (data: string[]) => ({
  type: track,
  data,
});

//앨범에 트랙 추가 함수

export const FavoriteAdd = (data: favoriteType[]) => ({
  type: FAVORITE,
  data,
});

//즐겨찾기 추가 함수

export const removeFavorite = (data: favoriteType[]) => ({
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
      const stateCheck: any[] = state.playlist.concat(action.data);
      return {
        ...state,
        playlist: stateCheck.filter((value, idx, arr) => {
          return (
            arr.findIndex((item) => {
              return item.url === value.url;
            }) === idx
          );
        }),
      };

    case track:
      return {
        ...state,
        track: action.data,
      };

    case FAVORITE:
      const favoritestateCheck = state.favoriteData.concat(action.data);
      return {
        ...state,
        favoriteData: favoritestateCheck.filter((value, idx, arr) => {
          return (
            arr.findIndex((item) => {
              return (
                item.id === value.id &&
                item.url === value.url &&
                item.title === value.title
              );
            }) === idx
          );
        }),
      };

    case Remove:
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
