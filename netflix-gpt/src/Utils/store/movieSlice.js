import {createSlice} from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name:'movie',
    initialState:{},
    trailerVideo:{},
    reducers:{
        addNowPlayingMovie:(state,action)=>{
            state.nowPlayingMovies = action.payload
        },
        addVideoIndex:(state,action)=>{
            state.trailerVideo.index=action.payload
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo.key=action.payload
        },

    }
})

export const {addNowPlayingMovie,addTrailerVideo,addVideoIndex} = movieSlice.actions
export default movieSlice.reducer