import { useState } from 'react';
import Navigation from '../components/Navigation';
import './Upload.css';
import axios from 'axios';

const Upload = () => {
  const [name, setname] = useState('');
  const [artistName, setartistName] = useState('');
  const [Audio, setAudio] = useState(null);
  const [ImageFile, setImageFile] = useState(null);
  const [mood, setMood] = useState(''); // ✅ added mood state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Audio) {
      alert('Attach audio file');
      return;
    }

    const formData = new FormData();
    formData.append('audio', Audio);
    formData.append('name', name);
    formData.append('artist', artistName);
    formData.append('mood', mood); // ✅ send mood to backend
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
      // reset form
      setname('');
      setartistName('');
      setMood(''); // ✅ reset mood
      setAudio(null);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <>
      <h1 className="upload-title">Upload Song</h1>
      <section className="upload-section">
        <div className="upload-div">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              name="Audiofile"
              id="file"
              placeholder="AudioFile"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
            />

            <input
              type="text"
              name="songName"
              id="songName"
              placeholder="Song Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="text"
              name="artistName"
              id="artistName"
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setartistName(e.target.value)}
            />

            {/* ✅ mood input (kept same styling with class/id conventions) */}
            <input
              type="text"
              name="mood"
              id="mood"
              placeholder="Mood (e.g. happy, sad, chill)"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />

            <input
              type="file"
              name="ImageFile"
              id="url"
              placeholder="ImageUrl"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <button type="submit">Upload</button>
          </form>
        </div>
        <Navigation />
      </section>
    </>
  );
};

export default Upload;
