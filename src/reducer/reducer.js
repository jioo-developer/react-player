const initialState = {
  playlist: [],
  favoriteData: [],
  playState: false,
};

const ADDLIST = "ADDLIST";
const FAVORITE = "FAVORITE";
const Remove = "Remove";
const playState = "playState";

export const ListAdd = (data) => ({
  type: ADDLIST,
  data,
});

export const FavoriteAdd = (data) => ({
  type: FAVORITE,
  data,
});

export const removeFavorite = (data) => ({
  type: Remove,
  data,
});

export const PlayStateAction = () => ({
  type: playState,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADDLIST:
      return {
        ...state,
        playlist: state.playlist.concat(action.data),
      };

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
