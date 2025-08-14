import { useState, useEffect } from 'react'
import './Search.css'
import NowPlaying from '../components/NowPlaying'
import Navigation from '../components/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSong, setIsPlaying } from '../features/Now_playing/Now_playingSlice'
import { getSongs } from '../features/song/songSlice'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const { songs, loading, error } = useSelector((state) => state.songs)

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePlaySong = (song) => {
    dispatch(setCurrentSong(song))
    dispatch(setIsPlaying(true))
  }

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Find in music"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <span className="search-icon">
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="2" />
            <line x1="15.5" y1="15.5" x2="12.5" y2="12.5" stroke="#888" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <div className="search-content">
        {loading ? (
          <div>Loading songs...</div>
        ) : error ? (
          <div>Error loading songs: {error}</div>
        ) : filteredSongs.length > 0 ? (
          <div className="song-list">
            {filteredSongs.map(song => (
              <div
                key={song.id}
                className="song-item"
                onClick={() => handlePlaySong(song)}
              >
                <img
                  src={song.image}
                  alt={song.title}
                  className="song-image"
                />
                <div className="song-details">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <p>No results found for &quot;{searchQuery}&quot;</p>
        ) : (
          <div className="song-list">
            {songs.map(song => (
              <div
                key={song.id}
                className="song-item"
                onClick={() => handlePlaySong(song)}
              >
                <img
                  src={song.image}
                  alt={song.title}
                  className="song-image"
                />
                <div className="song-details">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <NowPlaying className="now-playing-preview" />
      <Navigation />
    </div>
  )
}

export default Search
