import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Create Axios instance once here
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // comes from your .env file
  withCredentials: true, // allows cookies
});

const initialState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
  moodSearchResult: null,
  detectedMood: null,
};

// 🎵 Fetch all songs
export const getSongs = createAsyncThunk(
  'songs/getSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/songs/get');
      console.log('getSongs response:', response.data);
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

// 🔍 Search songs by text
export const songSearch = createAsyncThunk(
  'songs/songSearch',
  async (searchText, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/songs/search?query=${encodeURIComponent(searchText)}`
      );
      console.log('songSearch response:', response.data);
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

// 🎧 Get song by ID
export const getSongById = createAsyncThunk(
  'songs/getSongById',
  async (songId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/songs/get-songs/${songId}`);
      console.log('getSongById response:', response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

// 🧠 Search songs by mood (AI)
export const searchSongsByMood = createAsyncThunk(
  'songs/searchSongsByMood',
  async (moodText, { rejectWithValue }) => {
    try {
      const response = await API.post('/songs/mood', { text: moodText });
      console.log('searchSongsByMood response:', response.data);
      return {
        songs: response.data.data?.songs || [],
        detectedMood: response.data.data?.mood || null,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🎵 Get all songs
      .addCase(getSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(getSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔍 Search songs
      .addCase(songSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(songSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(songSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🎧 Get song by ID
      .addCase(getSongById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSongById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSong = action.payload;
      })
      .addCase(getSongById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🧠 Search songs by mood
      .addCase(searchSongsByMood.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.moodSearchResult = null;
      })
      .addCase(searchSongsByMood.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload.songs;
        state.moodSearchResult = action.payload;
        state.detectedMood = action.payload.detectedMood;
      })
      .addCase(searchSongsByMood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.moodSearchResult = null;
      });
  },
});

export default songSlice.reducer;
