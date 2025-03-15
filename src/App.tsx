import React, { useState } from 'react';
import { Book, Plus, Music } from 'lucide-react';
import SearchView from './components/SearchView';
import SongDetail from './components/SongDetail';
import AddSongModal from './components/AddSongModal';
import { Song, View } from './types';

function App() {
  const [view, setView] = useState<View>('search');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState<Song[]>([
    {
      id: '1',
      title: 'Wonderwall',
      artist: 'Oasis',
      chords: ['Em', 'G', 'D', 'A7sus4'],
      rating: 4.5,
      content: `[Verse]
Em           G
Today is gonna be the day
D                    A7sus4
That they're gonna throw it back to you`
    }
  ]);

  const handleAddSong = (song: Song) => {
    setSongs([...songs, { ...song, id: Date.now().toString(), rating: 0 }]);
    setIsModalOpen(false);
  };

  const handleRate = (songId: string, rating: number) => {
    setSongs(songs.map(song => 
      song.id === songId ? { ...song, rating } : song
    ));
  };

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setView('detail');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-7 w-7" />
            <h1 className="text-xl font-semibold">Chord Book</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-16 pb-8">
        {songs.length === 0 ? (
          <div className="text-center py-12 mt-8">
            <Music className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900">No songs yet</h3>
            <p className="mt-1 text-gray-500">Start by adding your first song</p>
          </div>
        ) : view === 'search' ? (
          <SearchView
            songs={filteredSongs}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSongSelect={handleSongSelect}
            onRate={(rating, songId) => handleRate(songId, rating)}
          />
        ) : (
          selectedSong && (
            <SongDetail
              song={selectedSong}
              onBack={() => setView('search')}
              onRate={(rating) => handleRate(selectedSong.id, rating)}
            />
          )
        )}
      </main>

      <AddSongModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSong}
      />
    </div>
  );
}

export default App;