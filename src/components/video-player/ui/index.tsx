// Imports
import { useState, useContext, createContext, Dispatch, SetStateAction, useEffect } from 'react';
import VideoPlayerContainer from './video-player';

// Interfaces
export interface VideoPlayerContainerProps {
    src: string;
};

export interface VideoPlayerContextProps {
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;

    fullScreen: boolean;
    setFullScreen: Dispatch<SetStateAction<boolean>>;

    miniMode: boolean;
    setMiniMode: Dispatch<SetStateAction<boolean>>;

    hidden: boolean;
    setHidden: Dispatch<SetStateAction<boolean>>;

    video: HTMLVideoElement;
    setVideo: Dispatch<SetStateAction<HTMLVideoElement>>;
}

// Context
export const VideoPlayerContext = createContext<VideoPlayerContextProps>({
    playing: false,
    setPlaying: () => { },

    fullScreen: false,
    setFullScreen: () => { },

    miniMode: false,
    setMiniMode: () => { },

    hidden: false,
    setHidden: () => { },

    video: document.createElement('video'),
    setVideo: () => { }
});

// Hook
export const useVideo = () => useContext(VideoPlayerContext);

// Provider
export default function VideoPlayer({ src }: VideoPlayerContainerProps) {

    // States
    const [playing, setPlaying] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [miniMode, setMiniMode] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [video, setVideo] = useState(document.createElement('video'));

    // Effects
    useEffect(() => {
        if (video) {

            video.paused ? 
                video.play().catch(e => console.log(e)) : // Play if paused + Catch an error if there is
                video.pause(); // Pause if playing
    
        }
    }, [playing]);

    return (
        <VideoPlayerContext.Provider

            // Provide All Context values
            value={{
                playing, setPlaying,
                fullScreen, setFullScreen,
                miniMode, setMiniMode,
                hidden, setHidden,
                video, setVideo
            }}
        >
            <VideoPlayerContainer src={src} />
        </VideoPlayerContext.Provider>
    );

}