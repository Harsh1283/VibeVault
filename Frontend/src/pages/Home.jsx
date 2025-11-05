import React from "react";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import NowPlaying from "../components/NowPlaying";
import SongList from "../components/SongList";
import "../pages/Home.css";
import { useDispatch } from 'react-redux';
import { setCurrentSong, setIsPlaying } from '../features/Now_playing/Now_playingSlice';
import { Link } from 'react-router-dom';
const Home = () => {
  const dispatch = useDispatch();

  const handleSongClick = (song) => {
    dispatch(setCurrentSong(song));
    dispatch(setIsPlaying(true));
  };

  const handlePlayPause = () => {
    dispatch(setIsPlaying((prev) => !prev));
  };

  return (
     <section className="home-section">
            {/* Header with Stream title and search icon */}
            <Navbar />

            {/* Song list */}
            <div className="inner">
            <div className="song-list">
                <SongList onSongClick={handleSongClick} />
            </div>

            {/* Now Playing bar at the bottom */}
            <NowPlaying
                onPlayPause={handlePlayPause}
            />
            </div>

            {/* Navigation bar */}
            <Navigation />
        </section>
    )
}
    // <div className="home">
    //   <Navbar />
    //   <div className="home__content">
    //     <SongList onSongClick={handleSongClick} />
    //   </div>

    //   {/* --- CORRECTED STRUCTURE --- */}
    //   {/* Wrap Navigation and NowPlaying in the bottom-bar container */}
    //   <div className="bottom-bar">
        
    //     <NowPlaying onPlayPause={handlePlayPause} />
    //     <Navigation />
    //   </div>
    // </div>
//   );
// };

export default Home;