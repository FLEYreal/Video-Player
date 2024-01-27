// Imports
import {
    useState,
    useContext,
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useLayoutEffect
} from 'react';
import VideoPlayerContainer from './player';

// Interfaces & Types
export type videoLength = {
    now: string,
    total: string
}

export interface VideoPlayerContainerProps {
    src: string;
};

export interface VideoPlayerContextProps {
    video: HTMLVideoElement;
    setVideo: Dispatch<SetStateAction<HTMLVideoElement>>;

    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;

    fullScreen: boolean;
    setFullScreen: Dispatch<SetStateAction<boolean>>;

    miniMode: boolean;
    setMiniMode: Dispatch<SetStateAction<boolean>>;

    hidden: boolean;
    setHidden: Dispatch<SetStateAction<boolean>>;

    volume: number;
    setVolume: Dispatch<SetStateAction<number>>;

    videoLength: videoLength;
    setVideoLength: Dispatch<SetStateAction<videoLength>>;
}

// Format time to have additional zero if number is lower than 10
const leadingZero = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2 // Minimum digits in number is 2
})

// Format time to a nice looking and understandable string
export const formatTime = (time: number) => {

    // Define time measures
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    // Format time and return result
    if (hours === 0) return `${minutes}:${leadingZero.format(seconds)}`
    else return `${hours}:${leadingZero.format(minutes)}:${leadingZero.format(seconds)}`
}

// Context
export const VideoPlayerContext = createContext<VideoPlayerContextProps>({
    video: document.createElement('video'),
    setVideo: () => { },

    playing: false,
    setPlaying: () => { },

    fullScreen: false,
    setFullScreen: () => { },

    miniMode: false,
    setMiniMode: () => { },

    hidden: false,
    setHidden: () => { },

    volume: 30,
    setVolume: () => { },

    videoLength: { now: '0:00', total: '3:50' },
    setVideoLength: () => { }
});

// Hook
export const useVideo = () => useContext(VideoPlayerContext);

// Provider
export default function VideoPlayer({ src }: VideoPlayerContainerProps) {

    // States
    const [video, setVideo] = useState(document.createElement('video'));
    const [playing, setPlaying] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [miniMode, setMiniMode] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [volume, setVolume] = useState(30)
    const [videoLength, setVideoLength] = useState({ now: '0:00', total: '3:50' });

    // Define video length
    const totalVideoLength = useMemo(() => formatTime(video.duration), [video.duration]);

    // Handlers
    const defineCurrentTime = () => {

        setVideoLength(prev => ({
            ...prev,
            now: formatTime(video.currentTime)
        }));

    }

    const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
            setFullScreen(true);
            setMiniMode(false);
        }

        else setFullScreen(false);
    }

    const handleMiniModeEnter = () => {
        setMiniMode(true);
        setFullScreen(false);
    }

    const handleMiniModeLeave = () => {
        setMiniMode(false);
    }

    // Effects
    useEffect(() => {
        if (video) {

            video.paused ?
                video.play().catch(e => console.log(e)) : // Play if paused + Catch an error if there is
                video.pause(); // Pause if playing

        }
    }, [playing]);

    useLayoutEffect(() => { // Load video length on mount
        setVideoLength(prev => ({ ...prev, total: totalVideoLength }));
    }, [totalVideoLength])

    useEffect(() => { // Add all event listeners to handle video stats changing

        if (video) {

            video.addEventListener('enterpictureinpicture', handleMiniModeEnter);
            video.addEventListener('leavepictureinpicture', handleMiniModeLeave);
            video.addEventListener('timeupdate', defineCurrentTime)
            document.addEventListener("fullscreenchange", handleFullscreenChange);

            return () => {
                video.removeEventListener('enterpictureinpicture', handleMiniModeEnter);
                video.removeEventListener('leavepictureinpicture', handleMiniModeLeave);
                video.removeEventListener('timeupdate', defineCurrentTime)
                document.removeEventListener("fullscreenchange", handleFullscreenChange);
            }

        }

    }, [video])

    return (
        <VideoPlayerContext.Provider

            // Provide All Context values
            value={{
                video, setVideo,
                playing, setPlaying,
                fullScreen, setFullScreen,
                miniMode, setMiniMode,
                hidden, setHidden,
                volume, setVolume,
                videoLength, setVideoLength
            }}
        >
            <VideoPlayerContainer src={src} />
        </VideoPlayerContext.Provider>
    );

}