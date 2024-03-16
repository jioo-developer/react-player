// MyContext.js (파일 생성)
import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import reducer, { initialState } from "./reducer.ts";
import { Action, commonData } from "./interfaceModule";

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
});

export const useMyContext = () => {
  return useContext(MyContext);
};
