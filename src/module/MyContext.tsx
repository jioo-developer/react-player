// MyContext.js (파일 생성)
import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import reducer, { initialState, removeFavorite } from "./reducer.ts";
import { Action, commonData, group } from "./interfaceModule.ts";
import { miniPlayer, saveDataHandler } from "./exportFunction.ts";
import { ListAdd, trackUpdate } from "./reducer.ts";

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [playlistData, addDispatch] = useReducer(reducer, initialState);
  const playlist = playlistData.playlist;
  const [favoriteData, favoriteDispatch] = useReducer(reducer, initialState);
  const favoriteState = favoriteData.favoriteData;
  const [trackData, trackDispatch] = useReducer(reducer, initialState);
  const track = trackData.track;
  const [playState, playDispatch] = useState(false);
  const [listToggle, setListToggle] = useState(false);
  const [playIndex, setIndex] = useState<number>(0);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupTrack, groupTrackDispatch] = useReducer(reducer, initialState);
  const groupList = groupTrack.groupTrack;

  function play(data, type, group?: string[]) {
    const copyTrack = [...track];
    const copyPlayList = [...playlist];

    if (group && group.length > 0) {
      const groupTrack = [...track, ...group];
      const groupList = [...playlist, ...data];
      trackDispatch(trackUpdate(groupTrack, type));
      addDispatch(ListAdd(groupList, type));
    } else {
      if (type === "unshift") {
        copyPlayList.unshift(data);
        copyTrack.unshift(data.url);
      } else {
        copyPlayList.push(data);
        copyTrack.push(data.url);
      }
      trackDispatch(trackUpdate(copyTrack, type));
      addDispatch(ListAdd(copyPlayList, type));
      if (type === "unshift") setIndex(0);
    }

    if (!playState) playDispatch(true);
    saveDataHandler(data, group);
    miniPlayer(playlist.length);
  }

  function favoriteDelete(DeleteData: commonData) {
    const defaultArray = [DeleteData];
    const result = favoriteState.filter(
      (item: commonData) =>
        !defaultArray.some(
          (defaultArray) =>
            defaultArray.id === item.id &&
            defaultArray.url === item.url &&
            defaultArray.title === item.title
        )
    );

    favoriteDispatch(removeFavorite(result));
  }

  return (
    <MyContext.Provider
      value={{
        navigate,
        playlist,
        addDispatch,
        favoriteState,
        favoriteDispatch,
        track,
        trackDispatch,
        playState,
        playDispatch,
        listToggle,
        setListToggle,
        playIndex,
        setIndex,
        groupTitle,
        setGroupTitle,
        groupList,
        groupTrackDispatch,
        play,
        favoriteDelete,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export interface MyContextProps {
  playlist: commonData[];
  favoriteState: commonData[];
  track: string[];
  playState: boolean;
  navigate: (params: string) => void;
  addDispatch: React.Dispatch<Action>;
  favoriteDispatch: React.Dispatch<Action>;
  trackDispatch: React.Dispatch<Action>;
  playDispatch: React.Dispatch<React.SetStateAction<boolean>>;
  listToggle: boolean;
  setListToggle: React.Dispatch<React.SetStateAction<boolean>>;
  playIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  groupTitle: string;
  setGroupTitle: React.Dispatch<React.SetStateAction<string>>;
  groupList: group[];
  groupTrackDispatch: React.Dispatch<Action>;
  play: (data: any, type: string, group?: string[]) => void;
  favoriteDelete: (DeleteData: commonData) => void;
}

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  playlist: initialState.playlist,
  favoriteState: initialState.favoriteData,
  track: initialState.track,
  addDispatch: () => {},
  favoriteDispatch: () => {},
  trackDispatch: () => {},
  playState: false,
  playDispatch: () => {},
  listToggle: false,
  setListToggle: () => {},
  playIndex: 0,
  setIndex: () => {},
  groupTitle: "",
  setGroupTitle: () => {},
  groupList: initialState.groupTrack,
  groupTrackDispatch: () => {},
  play: (data, type, group?) => {},
  favoriteDelete: (DeleteData) => {},
});

export const useMyContext = () => {
  return useContext(MyContext);
};
