import React from 'react';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Song } from '../types';
import SongListItem from './SongListItem';
import StarRating from './StarRating';

interface SongDetailProps {
  song: Song;
  onBack: () => void;
  onRate: (rating: number) => void;
}

const SongDetail: React.FC<SongDetailProps> = ({ song, onBack, onRate }) => {
  return (
    <div className="space-y-4">
      <div className="sticky top-[4.5rem] bg-white py-2 z-40 flex items-center justify-between border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-semibold">{song.title}</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <SongListItem song={song} onClick={() => {}} onRate={onRate} />
      
      <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap">
        {song.content}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {song.chords.map((chord, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-900"
          >
            {chord}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SongDetail;