interface favoriteSelectorType {
  favoriteData: favoriteType[];
}

interface favoriteType {
  id: number;
  singer: string;
  thumbnail: string;
  title: string;
  url: string;
}

interface useSelectorType extends favoriteSelectorType {
  playState: boolean;
  playlist: string[];
}

interface reducerType extends useSelectorType {
  track: string[];
}
