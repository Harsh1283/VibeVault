import { createSlice } from '@reduxjs/toolkit'

const initialState = {currentSong:null,isplaying:false}

export const nowPlayingSlice = createSlice({
    name:'nowPlaying',
    initialState,
    reducers:{
        setCurrentSong:(state,action)=>{
            state.currentSong = action.payload
        },
        setIsPlaying:(state,action)=>{
            state.isplaying = action.payload
        },
        resetNowPlaying:(state)=>{
            state.currentSong = null
            state.isplaying = false
        }
    }
})

export const {setCurrentSong,setIsPlaying,resetNowPlaying} = nowPlayingSlice.actions
export default nowPlayingSlice.reducer