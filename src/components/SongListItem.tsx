import React from 'react';
import { MoreHorizontal, Mic2, Music2, Radio, Headphones, Music4, Guitar } from 'lucide-react';
import { Song } from '../types';
import StarRating from './StarRating';

interface SongListItemProps {
  song: Song;
  onClick: () => void;
  onRate?: (rating: number) => void;
}

const getArtistIcon = (artist: string) => {
  const hash = artist.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const icons = [Mic2, Music2, Radio, Headphones, Music4, Guitar];
  const IconComponent = icons[hash % icons.length];
  
  return (
    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
      <IconComponent className="h-6 w-6" />
    </div>
  );
};

const SongListItem: React.FC<SongListItemProps> = ({ song, onClick, onRate }) => {
  return (
    <div 
      className="py-2 flex items-center space-x-3 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      {getArtistIcon(song.artist)}
      <div className="flex-1">
        <h3 className="font-semibold">{song.title}</h3>
        <p className="text-sm text-gray-500">{song.artist}</p>
        <div className="mt-1" onClick={e => e.stopPropagation()}>
          <StarRating rating={song.rating} onRate={onRate} size={16} />
        </div>
      </div>
      <button 
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          // Handle more options
        }}
      >
        <MoreHorizontal className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}

export default SongListItem;