import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAudioReady, setLoading, setPlaying } from "./audioSlice";

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.audio.loading);
    const audioReady = useSelector((state) => state.audio.audioReady);
    const playing = useSelector((state) => state.audio.playing);
    const audioUrl = useSelector((state) => state.audio.audioUrl);
    const sourceUrl = useSelector((state) => state.audio.sourceUrl);

    const [audioTime, setAudioTime] = useState('00:00:00');
    const [audio, setAudio] = useState(null);

    const stop = (audioObj) => {
        audioObj.src = null;

        setAudio(null);
        dispatch(setPlaying(false));
        dispatch(setAudioReady(false));
    }

    useEffect(() => {
        if (!loading || audioReady) return;

        const audioObj = new Audio(audioUrl);

        audioObj.addEventListener("canplaythrough", _ => {
            audioObj.play();
            
            setAudio(audioObj);

            dispatch(setLoading(false));
            dispatch(setPlaying(true));
            dispatch(setAudioReady(true));
        });

        audioObj.addEventListener("ended", _ => stop(audioObj));

    }, [loading]);

    useEffect(() => {
        if (!audio) return;
        
        if (playing) audio.play();
        else audio.pause();

    }, [playing]);

    if (!audio) return null;

    return (
        <div className='bg-neutral-700 w-full h-7 p-2 text-sm fixed bottom-0 left-0 flex flex-row items-center'>
            <span className='text-red-500 pr-2'>Now Playing:</span>
            Ciência Todo Dia | {audioTime} | {playing ? "Playing" : "Paused"} | <span className="cursor-pointer" onClick={() => stop(audio)}>Stop</span>
        </div>
    );
}

export default AudioPlayer;