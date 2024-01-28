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
    now: number,
    total: number
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

    speed: number;
    setSpeed: Dispatch<SetStateAction<number>>;

    videoLength: videoLength;
    setVideoLength: Dispatch<SetStateAction<videoLength>>;
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

    speed: 1,
    setSpeed: () => { },

    videoLength: { now: 0, total: 600 },
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
    const [speed, setSpeed] = useState(localStorage.getItem('speed') ? Number(localStorage.getItem('speed')) : video.playbackRate * 50);
    const [volume, setVolume] = useState(localStorage.getItem('volume') ? Number(localStorage.getItem('volume')) : 30);
    const [videoLength, setVideoLength] = useState({ now: 0, total: 600 });

    // Define video length
    const totalVideoLength = useMemo(() => video.duration, [video.duration]);

    // Handlers
    const defineCurrentTime = () => {

        // Set time
        setVideoLength(prev => ({
            ...prev,
            now: video.currentTime
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

            // Apply all listeners
            video.addEventListener('enterpictureinpicture', handleMiniModeEnter);
            video.addEventListener('leavepictureinpicture', handleMiniModeLeave);
            video.addEventListener('timeupdate', defineCurrentTime)
            document.addEventListener("fullscreenchange", handleFullscreenChange);

            // Remove listeners on unmount
            return () => {
                video.removeEventListener('enterpictureinpicture', handleMiniModeEnter);
                video.removeEventListener('leavepictureinpicture', handleMiniModeLeave);
                video.removeEventListener('timeupdate', defineCurrentTime)
                document.removeEventListener("fullscreenchange", handleFullscreenChange);
            }

        }

    }, [video])

    useEffect(() => { // Save volume to be able to save it between reloads

        if (!isNaN(volume)) {
            localStorage.setItem('volume', String(volume));
            video.volume = volume / 100;
        }

    }, [volume])

    useEffect(() => { // Save speed to be able to save it between reloads and element's unmounts

        if (speed && video) {
            localStorage.setItem('speed', String(speed)); // Save value for playback speed
            video.playbackRate = speed / 50; // Apply speed to video
        }

    }, [speed, video])

    return (
        <VideoPlayerContext.Provider

            // Provide All Context values
            value={{
                video, setVideo,
                playing, setPlaying,
                fullScreen, setFullScreen,
                miniMode, setMiniMode,
                hidden, setHidden,
                speed, setSpeed,
                volume, setVolume,
                videoLength, setVideoLength
            }}
        >
            <VideoPlayerContainer src={src} />
        </VideoPlayerContext.Provider>
    );

}