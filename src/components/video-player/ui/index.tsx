// Basics
import {
    useState,
    useContext,
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useLayoutEffect,
    useRef,
    MutableRefObject
} from 'react';

// Insides
import { fullScreenDelay, controlsDelay } from '../config'
import VideoPlayerContainer from './player';

// Interfaces & Types
export type videoLength = {
    now: number,
    total: number
};

export type notifyProps = {
    on: boolean,
    setOn: Dispatch<SetStateAction<boolean>>,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
};

export interface VideoPlayerContainerProps {
    src: string;
    keyHandler?: (event: KeyboardEvent) => void
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

    FSDelay?: MutableRefObject<boolean | null>;
    hideDelay?: MutableRefObject<boolean | null>;
    notify: notifyProps;
}

// Functions
const isVideoPlaying = (video: HTMLVideoElement) => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

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
    setVideoLength: () => { },

    notify: {
        on: false,
        setOn: () => { },
        title: '',
        setTitle: () => { }
    }
});

// Hook
export const useVideo = () => useContext(VideoPlayerContext);

// Provider
export default function VideoPlayer({ src, keyHandler: customKeyHandler }: VideoPlayerContainerProps) {

    // States
    const [video, setVideo] = useState(document.createElement('video'));
    const [playing, setPlaying] = useState(isVideoPlaying(video));
    const [fullScreen, setFullScreen] = useState(false);
    const [miniMode, setMiniMode] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [speed, setSpeed] = useState(localStorage.getItem('speed') ? Number(localStorage.getItem('speed')) : video.playbackRate * 50);
    const [volume, setVolume] = useState(localStorage.getItem('volume') ? Number(localStorage.getItem('volume')) : 30);
    const [videoLength, setVideoLength] = useState({ now: 0, total: 600 });
    const [on, setOn] = useState(false);
    const [title, setTitle] = useState('');


    // Refs
    const FSDelay = useRef<boolean | null>(null); // Delay to activate fullscreen
    const hideDelay: MutableRefObject<boolean | null> = useRef(null); // Delay to activate hidden mode


    // Define video length
    const totalVideoLength = useMemo(() => video.duration, [video.duration]);

    // Handlers
    const keyHandler = (event: KeyboardEvent) => {

        if (customKeyHandler) customKeyHandler(event)

        // Play & Pause video on Space
        if (event.code === 'Space') {
            setPlaying(prev => !prev);
        }

        // Increase Volume on Arrow Up
        else if (event.code === 'ArrowUp') {
            setVolume(prev => {
                if (prev + 5 > 100) {

                    return 100;
                }
                setOn(true)
                setTitle(`${prev + 5}%`)
                return prev + 5;
            })
        }

        // Decrease Volume on Arrow Down
        else if (event.code === 'ArrowDown') {
            setVolume(prev => {
                if (prev - 5 < 0) {
                    return 0;
                }
                setOn(true)
                setTitle(`${prev - 5}%`)
                return prev - 5;
            })
        }

        // Hide Menu
        else if (event.code === 'KeyS') {
            if (
                hideDelay !== null && // Item has to be defined
                hideDelay !== undefined &&
                !hideDelay.current // Not delayed
            ) {

                setHidden(true)
                hideDelay.current = true;

                setTimeout(() => {
                    hideDelay.current = false;
                }, controlsDelay * 1000)

            }
        }

        // Hide Menu
        else if (event.code === 'KeyW') {
            if (
                hideDelay !== null && // Item has to be defined
                hideDelay !== undefined &&
                !hideDelay.current // Not delayed
            ) {

                setHidden(false)
                hideDelay.current = true;

                setTimeout(() => {
                    hideDelay.current = false;
                }, controlsDelay * 1000)

            }
        }

        // Toggle Fullscreen
        else if (event.code === 'KeyF') {
            if (!FSDelay.current) {

                setFullScreen(prev => !prev) // Change state
                FSDelay.current = true; // Set delay to true

                setTimeout(() => { FSDelay.current = false }, fullScreenDelay * 2); // Start delay period and set delay state to false once it's done

            }
        }

    }

    const defineCurrentTime = () => {

        // Set time
        setVideoLength(prev => ({
            ...prev,
            now: video.currentTime
        }));

    }

    const handleMiniModeEnter = () => {
        setMiniMode(true);
        setFullScreen(false);
    }

    const handleMiniModeLeave = () => {
        setMiniMode(false);
    }

    const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
            setFullScreen(true);
            setMiniMode(false);
        }

        else setFullScreen(false);
    }

    // Effects
    useEffect(() => {
        if (video) {

            playing ?
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
            document.addEventListener('keyup', keyHandler)

            // Remove listeners on unmount
            return () => {
                video.removeEventListener('enterpictureinpicture', handleMiniModeEnter);
                video.removeEventListener('leavepictureinpicture', handleMiniModeLeave);
                video.removeEventListener('timeupdate', defineCurrentTime)
                document.removeEventListener("fullscreenchange", handleFullscreenChange);
                document.removeEventListener('keyup', keyHandler)
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

    useEffect(() => {

        if (fullScreen) {
            document.documentElement.requestFullscreen()
            setMiniMode(false);
        }
        else if (!fullScreen && document.fullscreenElement) document.exitFullscreen()

    }, [fullScreen])

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
                videoLength, setVideoLength,
                FSDelay, hideDelay,
                notify: {
                    on, setOn,
                    title, setTitle
                }
            }}
        >
            <VideoPlayerContainer src={src} />
        </VideoPlayerContext.Provider>
    );

}