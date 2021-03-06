import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../app/constants";
import AudioPlayerButton from "./AudioPlayerButton";
import { setAudioReady, setAudioUrl, setLoading, setPlaying, setSourceUrl } from "./audioSlice";

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.audio.loading);
    const audioReady = useSelector((state) => state.audio.audioReady);
    const playing = useSelector((state) => state.audio.playing);
    const audioUrl = useSelector((state) => state.audio.audioUrl);
    const sourceUrl = useSelector((state) => state.audio.sourceUrl);

    const [audioTime, setAudioTime] = useState('00:00:00');
    const [audio, setAudio] = useState(null);
    const [audioTitle, setAudioTitle] = useState('');
    const [nextVideo, setNextVideo] = useState(null);

    const stop = useCallback((audioObj) => {
        audioObj.src = null;

        setAudio(null);
        setAudioTitle('');
        setAudioTime('00:00:00');
        dispatch(setPlaying(false));
        dispatch(setAudioReady(false));
    }, [dispatch]);

    const next = useCallback((audioObj) => {
        const videoStreamApi = `${config.url.STREAM_API}/download`;
        const newAudioUrl = `${videoStreamApi}?videoUrl=${nextVideo}`;

        stop(audioObj);
        dispatch(setLoading(true));
        dispatch(setSourceUrl(nextVideo));
        dispatch(setAudioUrl(newAudioUrl));
    }, [dispatch, stop, nextVideo]);

    // Init audio player after loading
    useEffect(() => {
        if (!loading || audioReady) return;

        const setupAudio = () => {
            setAudioTitle("Loading...");
            const audioObj = new Audio(audioUrl);

            const fetchAudioData = async () => {
                const videoDataApi = `${config.url.STREAM_API}/fetch-data`;
                const res = await fetch(`${videoDataApi}?videoUrl=${sourceUrl}`);
                const videoData = await res.json();
    
                setAudioTitle(videoData.title);
                setNextVideo(videoData.nextVideo);
            }

            audioObj.addEventListener("canplaythrough", _ => {
                fetchAudioData();
                
                setAudio(audioObj);
                dispatch(setLoading(false));
                dispatch(setPlaying(true));
                dispatch(setAudioReady(true));

                audioObj.play();
            });

            audioObj.addEventListener("ended", _ => nextVideo ? next(audioObj) : stop(audioObj));
        }
        
        setupAudio();

    }, [loading, audioReady, audioUrl, sourceUrl, nextVideo, dispatch, stop, next]);

    // Handles play/pause events and sets the timer
    useEffect(() => {
        if (!audio) return;

        if (playing) audio.play();
        else audio.pause();

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

    }, [playing, audio]);

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
                { nextVideo && (<>| <AudioPlayerButton type="next" action={() => next(audio)} /></>) }
                | <AudioPlayerButton type="stop" action={() => stop(audio)} />
            </div>
        </div>
    );
}

export default AudioPlayer;
