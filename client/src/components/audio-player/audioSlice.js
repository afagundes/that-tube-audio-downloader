import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        loading: false,
        playing: false,
        audioReady: false,
        sourceUrl: null,
        audioUrl: null        
    },
    reducers: {
        setLoading: (state, loading) => {
            state.loading = loading.payload;
        },
        setPlaying: (state, playing) => {
            state.playing = playing.payload;
        },
        setAudioReady: (state, audioReady) => {
            state.audioReady = audioReady.payload;
        },
        setSourceUrl: (state, sourceUrl) => {
            state.sourceUrl = sourceUrl.payload;
        },
        setAudioUrl: (state, audioUrl) => {
            state.audioUrl = audioUrl.payload;
        },
    }
});

export const { setLoading, setPlaying, setAudioReady, setSourceUrl, setAudioUrl } = audioSlice.actions;

export default audioSlice.reducer;
