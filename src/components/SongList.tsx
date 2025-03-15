import React from 'react';
import { MoreHorizontal, Mic2, Music2, Radio, Headphones, Music4, Guitar } from 'lucide-react';
import { Song } from '../types';

interface SongListProps {
  songs: Song[];
}

const getArtistIcon = (artist: string) => {
  // Create a simple hash of the artist name to consistently select an icon
  const hash = artist.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const icons = [Mic2, Music2, Radio, Headphones, Music4, Guitar];
  const IconComponent = icons[hash % icons.length];
  
  return (
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
      <IconComponent className="h-4 w-4" />
    </div>
  );
};

const SongList: React.FC<SongListProps> = ({ songs }) => {
  return (
    <div className="space-y-6 mt-4">
      {songs.map((song) => (
        <article key={song.id} className="bg-white rounded-none border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getArtistIcon(song.artist)}
              <div>
                <h3 className="font-semibold">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap">
            {song.content}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {song.chords.map((chord, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-900"
              >
                {chord}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default SongList;