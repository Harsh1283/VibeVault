import { useState, useEffect } from 'react'
import './Search.css'
import NowPlaying from '../components/NowPlaying'
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSong, setIsPlaying } from '../features/Now_playing/Now_playingSlice'
import { getSongs, searchSongsByMood } from '../features/song/songSlice'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMoodModal, setShowMoodModal] = useState(false)
  const [moodQuery, setMoodQuery] = useState('')
  const dispatch = useDispatch()
  const { songs, loading, error, moodSearchResult, detectedMood } = useSelector((state) => state.songs)

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

  const handleMoodSearch = async () => {
    if (moodQuery.trim()) {
      await dispatch(searchSongsByMood(moodQuery))
      setShowMoodModal(false)
      setMoodQuery('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMoodSearch()
    }
  }

  // Normalize a 'not found' style error message coming from backend (404 or similar)
  const notFoundError = (() => {
    if (!error) return false
    const message = typeof error === 'string' ? error : (error.message || '')
    return /not\s*found/i.test(message) || /no\s*songs\s*found/i.test(message)
  })()

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

      {/* AI Mood Search Button */}
      <button 
        className="ai-search-btn" 
        onClick={() => setShowMoodModal(true)}
        title="Search by mood"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
          <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" fill="currentColor"/>
          <path d="M5 9L5.37 10.63L7 11L5.37 11.37L5 13L4.63 11.37L3 11L4.63 10.63L5 9Z" fill="currentColor"/>
        </svg>
      </button>

      {/* Mood Search Modal */}
      {showMoodModal && (
        <div className="mood-modal-overlay" onClick={() => setShowMoodModal(false)}>
          <div className="mood-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Search by Mood</h3>
            <p>Describe how you're feeling or what mood you want to listen to</p>
            <input
              type="text"
              className="mood-input"
              placeholder="e.g., happy, relaxed, energetic, sad..."
              value={moodQuery}
              onChange={(e) => setMoodQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <div className="mood-modal-buttons">
              <button onClick={() => setShowMoodModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleMoodSearch} className="search-btn" disabled={!moodQuery.trim()}>
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display detected mood if available */}
      {detectedMood && moodSearchResult && (
        <div className="mood-result-info">
          <p>Songs for your mood: <strong>{detectedMood}</strong></p>
        </div>
      )}
      

      <div className="search-content">
        {loading ? (
          <div>Loading songs...</div>
        ) : /* Show elegant empty state when backend says no songs found for mood or when mood result is empty */
        notFoundError || (moodSearchResult && Array.isArray(moodSearchResult.songs) && moodSearchResult.songs.length === 0) ? (
          <div className="empty-state">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5h2v6h-2z" fill="#667eea"/>
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="#e6eefc"/>
              <path d="M7.2 16.8l1.4-1.4L12 18l3.4-2.6 1.4 1.4L12 21l-4.8-4.2z" fill="#cfe0ff"/>
            </svg>
            <h3>No songs found</h3>
            <p className="empty-message">
              We couldn't find songs for {detectedMood || moodSearchResult?.detectedMood ? `"${(detectedMood || moodSearchResult?.detectedMood)}"` : (searchQuery ? `"${searchQuery}"` : 'that mood')}. Try another mood or search term.
            </p>
            <div className="empty-actions">
              <button className="try-again-btn" onClick={() => setShowMoodModal(true)}>Try a different mood</button>
              <Link to="/upload" className="upload-link">Upload a song</Link>
            </div>
          </div>
        ) : filteredSongs.length > 0 ? (
          <div className="song-list">
            {filteredSongs.map(song => (
              <div
                key={song._id || song.id}
                className="song-item"
                onClick={() => handlePlaySong(song)}
              >
                <img
                  src={song.image}
                  alt={song.name}
                  className="song-image"
                />
                <div className="song-details">
                  <div className="song-title">{song.name}</div>
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
                key={song._id || song.id}
                className="song-item"
                onClick={() => handlePlaySong(song)}
              >
                <img
                  src={song.image}
                  alt={song.name}
                  className="song-image"
                />
                <div className="song-details">
                  <div className="song-title">{song.name}</div>
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
