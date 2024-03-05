// MyContext.js (파일 생성)
import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import reducer, { initialState } from "./reducer";
import { Action, commonData } from "./interfaceModule";

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [playlist, addDispatch] = useReducer(reducer, initialState);
  const [favoriteData, favoriteDispatch] = useReducer(reducer, initialState);
  const [track, trackDispatch] = useReducer(reducer, initialState);
  const [playState, playDispatch] = useState(false);
  return (
    <MyContext.Provider
      value={{
        navigate,
        playlist,
        addDispatch,
        favoriteData,
        favoriteDispatch,
        track,
        trackDispatch,
        playState,
        playDispatch,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export interface MyContextProps {
  playlist: any;
  favoriteData: any;
  track: any;
  playState: boolean;
  navigate: (params: string) => void;
  addDispatch: React.Dispatch<Action>;
  favoriteDispatch: React.Dispatch<Action>;
  trackDispatch: React.Dispatch<Action>;
  playDispatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  playlist: initialState.playlist,
  favoriteData: initialState.favoriteData,
  track: initialState.track,
  addDispatch: () => {},
  favoriteDispatch: () => {},
  trackDispatch: () => {},
  playState: false,
  playDispatch: () => {},
});

export const useMyContext = () => {
  return useContext(MyContext);
};
