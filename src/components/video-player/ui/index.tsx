// Imports
import { useState, useContext, createContext, Dispatch, SetStateAction, useEffect } from 'react';
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