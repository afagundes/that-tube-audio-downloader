import { useEffect, useState } from "react";
import { ImPause2, ImStop2, ImPlay3 } from "react-icons/im";

const AudioPlayerButton = ({ type, action }) => {
    const [button, setButton] = useState(null);
    const buttonStyle = "text-red-500";
    const buttonSize = 20;

    useEffect(() => {
        switch (type) {
            case "play":
                setButton(<ImPlay3 className={buttonStyle} size={buttonSize} />);
                break;
            case "pause":
                setButton(<ImPause2 className={buttonStyle} size={buttonSize} />);
                break;
            case "stop":
                setButton(<ImStop2 className={buttonStyle} size={buttonSize} />);
                break;
            default:
                setButton(null);
        }
    }, [type]);

    return (
        <button type="button" className="mx-1" onClick={action}>
            {button}    
        </button>
    );
}

export default AudioPlayerButton;