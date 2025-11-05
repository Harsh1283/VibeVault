// src/components/SongList.jsx
import React from 'react';
import SongItem from './Songitme';
import './SongList.css';
import { useDispatch,useSelector } from 'react-redux';
import { getSongs } from '../features/song/songSlice';
import { useEffect } from 'react';

// export const songs = [
//   {
//     id: 1,
//     title: 'Ho Hey',
//     artist: 'The Lumineers',
//     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48',
//   },
//   {
//     id: 2,
//     title: 'Fix You',
//     artist: 'Coldplay',
//     image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48',
//   },
//   {
//     id: 3,
//     title: 'Shape of You',
//     artist: 'Ed Sheeran',
//     image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=facearea&w=48&h=48',
//   },
//   {
//     id: 4,
//     title: 'Rolling in the Deep',
//     artist: 'Adele',
//     image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=48&h=48',
//   },
//   {
//     id: 5,
//     title: 'Believer',
//     artist: 'Imagine Dragons',
//     image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48',
//   },
//   {
//     id: 6,
//     title: 'Sugar',
//     artist: 'Maroon 5',
//     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48',
//   },
//   {
//     id: 7,
//     title: 'Shake It Off',
//     artist: 'Taylor Swift',
//     image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=facearea&w=48&h=48',
//   },
//   {
//     id: 8,
//     title: 'Sorry',
//     artist: 'Justin Bieber',
//     image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=48&h=48',
//   },
// ];

const SongList = ({ onSongClick }) => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state) => state.songs);
  useEffect(() => {
      dispatch(getSongs());
      
      
    }, [dispatch]);
    console.log('songs', songs);
    

  if (loading) {
    return <div>Loading songs...</div>;
  } else if (error) {
   const message = typeof error === 'string' ? error : (error?.message || 'Unknown error');
   return <div>Error loading songs: {message}</div>;
  }
  return (
    <div className="space-y-2 mt-4">
      {songs.map((song) => (
        <SongItem
          key={song._id || song.id}
          image={song.image}
          title={song.name}
          artist={song.artist}
          onClick={() => onSongClick && onSongClick(song)}
        />
      ))}
    </div>
  );
};

export default SongList;
