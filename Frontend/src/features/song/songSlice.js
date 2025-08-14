import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all songs
export const getSongs = createAsyncThunk(
  'songs/getSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/songs/get', {
        withCredentials: true,
      });
      console.log('songs', response.data.songs);
      return response.data.songs;
      
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to search for songs
export const songSearch = createAsyncThunk(
  'songs/songSearch',
  async (searchText, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/songs/search?text=${searchText}`,
        { withCredentials: true }
      );
      return response.data.songs;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to get a song by its ID
export const getSongById = createAsyncThunk(
  'songs/getSongById',
  async (songId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/songs/get-songs/${songId}`,
        { withCredentials: true }
      );
      return response.data.song;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default songSlice.reducer;