export type commonData = {
  id?: number;
  singer?: string;
  thumbnail: string;
  title: string;
  url: string;
};

export interface Action {
  type: string;
  data?: any;
  direction?: string;
}

export type group = {
  title: string;
  dataArr: commonData[];
};

export type stateType = {
  playlist: commonData[];
  favoriteData: commonData[];
  track: string[];
  playState: boolean;
  groupTrack: group[];
};

export interface loadContextProps {
  playlist: commonData[];
  favoriteData: commonData[];
  track: string[];
  playState: boolean;
  navigate: (params: string) => void;
  addDispatch: React.Dispatch<Action>;
  favoriteDispatch: React.Dispatch<Action>;
  trackDispatch: React.Dispatch<Action>;
  playDispatch: React.Dispatch<React.SetStateAction<boolean>>;
}
