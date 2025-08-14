import { configureStore } from '@reduxjs/toolkit'
import nowPlayingReducer from '../features/Now_playing/Now_playingSlice'
import songReducer from '../features/song/songSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer:{
        nowPlaying:nowPlayingReducer,
         songs: songReducer,
          auth: authReducer,
    }
})