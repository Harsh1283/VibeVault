import { useState } from 'react';
import Navigation from '../components/Navigation'
import './Upload.css'
import axios from 'axios';
import { use } from 'react';

const Upload = () => {
      const[name,setname]=useState('') ;
      const[artistName,setartistName]=useState('')
      const[Audio,setAudio]=useState(null)
      const[ImageUrl,setImageUrl]=useState('')

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if (!Audio){
            alert("attach audio file")
            return;
        }


        const formData = new FormData();
        formData.append('audio', Audio); // key name must match backend
         formData.append('name', name);
        formData.append('artist', artistName);
        formData.append('image', ImageUrl);

        try {
           const res = await axios.post('http://localhost:3000/songs/upload', formData, {
                
           });
          console.log(res.data);
          alert('Upload successful!');
          } catch (err) {
              console.error(err);
            alert('Upload failed');
         }
    }
 
  return (


    <>
      <h1 className="upload-title">Upload Song</h1>
      <section className=" upload-section">
        <div className="upload-div">
          <form onSubmit={handleSubmit}>
            <input type="file" name="Audiofile" id="file" placeholder='AudioFile' 
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}/>

            <input type="text" name="songName" id="songName" placeholder="Song Name" 
            value={name} 
            onChange={(e) => setname(e.target.value)}
              />

            <input type="text" name="artistName" id="artistName" placeholder='Artist Name' 
            value={artistName}
            onChange={(e) => setartistName(e.target.value)} 
            />

            <input type="text" name="ImageUrl" id="url" placeholder='ImageUrl' 
             value={ImageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button type="submit">Upload</button>
          </form>
        </div>
        <Navigation/>
      </section>
    </>
  )
}

export default Upload