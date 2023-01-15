const initialState = {
  playlist: [],
  favoriteData: [],
  playState: false,
  track : []
};

const ADDLIST = "ADDLIST";
const FAVORITE = "FAVORITE";
const Remove = "Remove";
const playState = "playState";
const track = "track"

export const ListAdd = (data) => ({
  type: ADDLIST,
  data,
});

export const trackUpdate = (data) => ({
  type :track,
  data
});

//앨범에 트랙 추가 함수 

export const FavoriteAdd = (data) => ({
  type: FAVORITE,
  data,
});

//즐겨찾기 추가 함수

export const removeFavorite = (data) => ({
  type: Remove,
  data,
});

// 즐겨찾기 삭제 함수

export const PlayStateAction = () => ({
  type: playState,
});

// 재생/일시중지 함수

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADDLIST:
      return {
        ...state,
        playlist: state.playlist.concat(action.data),
      };

    case track:
      return {
        ...state,
        track : action.data
      }

    case FAVORITE:
      return {
        ...state,
        favoriteData: state.favoriteData
          .concat(action.data)
          .filter((value, idx, arr) => {
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
