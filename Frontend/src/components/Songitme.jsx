// src/components/SongItem.jsx
import React from 'react';
import './SongList.css';

const SongItem = ({ image, title, artist, onClick }) => {
  return (
    <div className="song-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt={title} className="song-item__img" />
      <div className="song-item__info">
        <div className="song-item__title">{title}</div>
        <div className="song-item__artist">{artist}</div>
      </div>
    </div>
  );
};

export default SongItem;
