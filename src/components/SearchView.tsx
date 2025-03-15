import React from 'react';
import { Search } from 'lucide-react';
import { Song } from '../types';
import SongListItem from './SongListItem';

interface SearchViewProps {
  songs: Song[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSongSelect: (song: Song) => void;
  onRate: (rating: number, songId: string) => void;
}

const SearchView: React.FC<SearchViewProps> = ({
  songs,
  searchQuery,
  onSearchChange,
  onSongSelect,
  onRate,
}) => {
  return (
    <div className="space-y-2">
      <div className="sticky top-[4.5rem] bg-white py-2 z-40">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search songs or artists..."
            className="block w-full pl-10 pr-3 py-2 bg-gray-100 border-none rounded-xl text-sm focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {songs.map((song) => (
          <SongListItem
            key={song.id}
            song={song}
            onClick={() => onSongSelect(song)}
            onRate={(rating) => onRate(rating, song.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchView;