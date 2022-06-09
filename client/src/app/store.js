import { configureStore } from '@reduxjs/toolkit';
import audioReducer from '../components/audio-player/audioSlice'

export default configureStore({
    reducer: {
        audio: audioReducer
    },
});
