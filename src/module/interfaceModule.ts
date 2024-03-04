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
}

export type state = {
  playlist: commonData[];
  favoriteData: commonData[];
  playState: boolean;
  track: string[];
};
