export type TEpisode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  durationAsString: string;
  published_at: string;
  description: string,
  slug: string,
  
  file: {
    duration: number;
    url: string;
    type: string;
  }
}

export type TPlayerContextData = {
  episodeList: TEpisode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: TEpisode) => void;
  playList: (list: TEpisode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void
  playNext: () => void;
  playPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  toggleLoop: () => void;
  isShuffling: boolean;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
}

export type THomeProps = {
  latestEpisodes: TEpisode[];
  allEpisodes: TEpisode[];
}
