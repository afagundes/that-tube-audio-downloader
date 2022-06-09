import { useState } from "react";
import Button from "./Button";

const Form = () => {
    const formAction = "http://localhost:8080/download";

    const [videoUrl, setVideoUrl] = useState('');
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [audio, setAudio] = useState(null);

    const prepareVideoUrl = () => {
        const youTubePattern = /^(http(s)?:\/\/)?(www\.)?(youtube.com\/(watch\?v=(.+)|shorts\/(.+)))/;
        const matches = videoUrl.match(youTubePattern);

        if (matches) return `https://www.${matches[4]}`;
        return null;
    }

    const downloadAudio = (event) => {
        const url = prepareVideoUrl();
        
        if (!url) {
            setInvalid(true);
            event.preventDefault();

            return;
        }

        setVideoUrl(url);
        setInvalid(false);
    }

    const playAudio = () => {
        if (!playing && audio) {
            audio.play();
            setPlaying(true);

            return;
        }

        const url = prepareVideoUrl();
        if (!url) {
            setInvalid(true);
            return;
        }

        const audioUrl = `${formAction}?videoUrl=${videoUrl}`;
        const audioObj = new Audio(audioUrl);

        setLoading(true);
        setPlaying(false);
        setInvalid(false);

        audioObj.addEventListener("canplaythrough", _ => {
            audioObj.play();
            setPlaying(true);
            setLoading(false);
        });

        audioObj.addEventListener("ended", _ => {
            setAudio(null);
            setPlaying(false);
            setLoading(false);
        });

        setAudio(audioObj);
    }

    const pauseAudio = () => {
        audio.pause();
        setPlaying(false);
    }

    return (
        <form className="mt-6 w-full"
            onSubmit={downloadAudio}
            action={formAction}
        >
            <input type="text"
                name="videoUrl"
                className="w-full text-zinc-800 bg-slate-100 p-2 rounded-md"
                placeholder="https://www.youtube.com/watch?v=BPVu5xaZk-4"
                onChange={(event) => setVideoUrl(event.target.value)}
                value={videoUrl}
                autoFocus
            />

            {invalid && (
                <div className="w-full text-center text-sm text-red-500 mt-1">
                    Please, input a valid YouTube url.
                </div>
            )}

            <div className="flex flex-row items-center justify-center mt-6">
                <Button text="Download" isSubmit='true' />
                {
                    playing
                        ? <Button text="Pause" action={pauseAudio} active={playing} />
                        : <Button text="Play" action={playAudio} showLoading={loading} active={!loading && audio != null} />
                }
            </div>
        </form>
    );
}

export default Form;