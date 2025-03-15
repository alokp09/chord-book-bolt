import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Song } from '../types';

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (song: Song) => void;
}

const AddSongModal: React.FC<AddSongModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [chords, setChords] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: '',
      title,
      artist,
      chords: chords.split(',').map(chord => chord.trim()),
      content,
      rating: 0
    });
    setTitle('');
    setArtist('');
    setChords('');
    setContent('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-base font-semibold flex-1 text-center">New Song</h2>
          <button
            type="submit"
            form="addSongForm"
            className="text-sm font-semibold text-blue-500 hover:text-blue-600"
          >
            Share
          </button>
        </div>

        <form id="addSongForm" onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Song title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-100 rounded-xl border-none text-sm focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Artist name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-100 rounded-xl border-none text-sm focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Chords (comma-separated)"
              value={chords}
              onChange={(e) => setChords(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-100 rounded-xl border-none text-sm focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Add song content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="block w-full px-3 py-2 bg-gray-100 rounded-xl border-none text-sm focus:outline-none focus:ring-0 resize-none font-mono"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSongModal;