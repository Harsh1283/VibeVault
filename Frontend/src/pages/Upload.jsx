import { useState } from 'react';
import Navigation from '../components/Navigation';
import './Upload.css';
import axios from 'axios';

const Upload = () => {
  const [name, setname] = useState('');
  const [artistName, setartistName] = useState('');
  const [Audio, setAudio] = useState(null);
  const [ImageFile, setImageFile] = useState(null);
  const [selectedMood, setSelectedMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const moods = [
    'happy',
    'sad',
    'energetic',
    'calm',
    'romantic',
    'nostalgic',
    'melancholic',
    'upbeat',
    'peaceful',
    'intense',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Audio) {
      alert('Attach audio file');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('audio', Audio);
    formData.append('name', name);
    formData.append('artist', artistName);
    formData.append('mood', selectedMood);
    if (ImageFile) formData.append('image', ImageFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/songs/upload`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(res.data);
      alert('Upload successful!');
      setname('');
      setartistName('');
      setSelectedMood('');
      setAudio(null);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="upload-title">Upload Song</h1>
      <section className="upload-section">
        <div className="upload-div">
          <form onSubmit={handleSubmit}>
            
            {/* Custom Audio file input */}
            <label htmlFor="file" className="file-label">
              {Audio ? Audio.name : 'Choose Audio File'}
            </label>
            <input
              type="file"
              id="file"
              accept="audio/*"
              style={{ display: 'none' }}
              onChange={(e) => setAudio(e.target.files[0])}
            />

            <input
              type="text"
              placeholder="Song Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="text"
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setartistName(e.target.value)}
            />

            {/* Mood Checkboxes */}
            <div className="mood-container">
              <label className="mood-label">Select Mood:</label>
              <div className="mood-checkboxes">
                {moods.map((mood) => (
                  <label key={mood} className="mood-checkbox-label">
                    <input
                      type="radio"
                      name="mood"
                      value={mood}
                      checked={selectedMood === mood}
                      onChange={(e) => setSelectedMood(e.target.value)}
                      className="mood-checkbox"
                    />
                    <span className="mood-text">
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Image file input */}
            <label htmlFor="imageFile" className="file-label">
              {ImageFile ? ImageFile.name : 'Choose Cover Image'}
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
        <Navigation />
      </section>
    </>
  );
};

export default Upload;
