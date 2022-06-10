import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayerButton from "./AudioPlayerButton";
import { setAudioReady, setLoading, setPlaying } from "./audioSlice";

const AudioPlayer = () => {
    const videoDataApi = 'http://localhost:8080/fetch-data';

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.audio.loading);
    const audioReady = useSelector((state) => state.audio.audioReady);
    const playing = useSelector((state) => state.audio.playing);
    const audioUrl = useSelector((state) => state.audio.audioUrl);
    const sourceUrl = useSelector((state) => state.audio.sourceUrl);

    const [audioTime, setAudioTime] = useState('00:00:00');
    const [audio, setAudio] = useState(null);
    const [audioTitle, setAudioTitle] = useState('');

    const stop = useCallback((audioObj) => {
        audioObj.src = null;

        setAudio(null);
        setAudioTime('00:00:00');
        dispatch(setPlaying(false));
        dispatch(setAudioReady(false));
    }, [dispatch]);

    // Init audio player after loading
    useEffect(() => {
        if (!loading || audioReady) return;

        const setupAudio = () => {
            const audioObj = new Audio(audioUrl);

            audioObj.addEventListener("canplaythrough", _ => {
                audioObj.play();

                setAudio(audioObj);

                dispatch(setLoading(false));
                dispatch(setPlaying(true));
                dispatch(setAudioReady(true));
            });

            audioObj.addEventListener("ended", _ => stop(audioObj));
        }
        
        const fetchAudioData = async () => {
            const res = await fetch(`${videoDataApi}?videoUrl=${sourceUrl}`);
            const videoData = await res.json();

            setAudioTitle(videoData.title);
        }

        setupAudio();
        fetchAudioData();

    }, [loading, audioReady, audioUrl, sourceUrl, dispatch, stop]);

    // Handles play/pause events
    useEffect(() => {
        if (!audio) return;

        if (playing) audio.play();
        else audio.pause();

    }, [playing, audio]);

    // Update audio timer
    useEffect(() => {
        const setCurrentTime = () => {
            return setInterval(() => {
                if (!audio || !playing || audio.currentTime < 1) return;

                const seconds = parseInt(audio.currentTime % 60).toString().padStart(2, '0');
                const minutes = parseInt(audio.currentTime / 60).toString().padStart(2, '0');
                const hours = parseInt(audio.currentTime / 60 / 60).toString().padStart(2, '0');

                setAudioTime(`${hours}:${minutes}:${seconds}`);
            }, 500);
        }

        const currentTimeHandler = setCurrentTime();

        return () => clearInterval(currentTimeHandler);
    }, [audio, playing]);

    if (!audio) return null;

    return (
        <div className='bg-neutral-700 w-full h-7 p-2 text-sm fixed bottom-0 left-0 
                            flex flex-row items-center justify-between'>
            <div>
                <span className='text-red-500 pr-2'>Now Playing:</span>
                {audioTitle} | {audioTime}
            </div>

            <div className="flex">
                <AudioPlayerButton
                    type={playing ? "pause" : "play"}
                    action={() => dispatch(setPlaying(!playing))}
                />
                |
                <AudioPlayerButton type="stop" action={() => stop(audio)} />
            </div>
        </div>
    );
}

export default AudioPlayer;
