export interface Song {
  id: string;
  title: string;
  artist: string;
  chords: string[];
  content: string;
  rating: number;
}

export type View = 'search' | 'detail';