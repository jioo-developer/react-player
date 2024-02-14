// MyContext.js (파일 생성)
import React, { ReactNode, createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyContext = createContext({
  navigate: (params: string) => {},
  dispatch: (params: any) => {},
});

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <MyContext.Provider value={{ navigate, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
