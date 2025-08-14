import "./NowPlaying.css";
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlaying } from '../features/Now_playing/Now_playingSlice';
import { useRef, useEffect, useState } from 'react';

const NowPlaying = ({ className = "" }) => {
  const currentSong = useSelector(state => state.nowPlaying.currentSong);
  const isPlaying = useSelector(state => state.nowPlaying.isplaying);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0); // % progress

  // Handle play/pause when isPlaying state changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          dispatch(setIsPlaying(false));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, dispatch, currentSong]);

  // Update progress bar as song plays
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  // When audio ends
  const handleAudioEnded = () => {
    dispatch(setIsPlaying(false));
    setProgress(0);
  };

  // On audio load error
  const handleAudioError = (error) => {
    console.error('Audio loading error:', error);
    dispatch(setIsPlaying(false));
  };

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  if (!currentSong) return null; // Don't render if no song is selected

  return (
    <div className={`now-playing ${className}`}>
  <div
    className="now-playing__progress-fill"
    style={{ width: `${progress}%` }}
  ></div>

  <div className="now-playing__top">
    <img src={currentSong.image} className="now-playing__img" alt={currentSong.name} />
    <div className="now-playing__info">
      <div className="now-playing__title">{currentSong.name}</div>
      <div className="now-playing__artist">{currentSong.artist}</div>
    </div>
    <button className="now-playing__play" onClick={handlePlayPause}>
      {isPlaying ? (
        <span role="img" aria-label="pause"><i className="ri-pause-line"></i></span>
      ) : (
        <span role="img" aria-label="play"><i className="ri-play-fill"></i></span>
      )}
    </button>
  </div>

  <audio
    ref={audioRef}
    src={currentSong.audio}
    onEnded={handleAudioEnded}
    onError={handleAudioError}
    onTimeUpdate={handleTimeUpdate}
    preload="metadata"
  />
</div>

  );
};

export default NowPlaying;
