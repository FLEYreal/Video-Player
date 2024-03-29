// Bascis
import { useEffect, useRef, useState } from "react";

// UI-Libs
import styled from '@emotion/styled';

// Insides
import ControlsContainer from "../controls-container";
import { useVideo, VideoPlayerContainerProps } from "..";
import { Wrapper } from './wrapper';
import { fullScreenDelay } from "../../config";
import Notify from "../notify";

export const Video = styled.video`
    width: 100%;
`

// Video Player
function VideoPlayerContainer({ src, sx }: VideoPlayerContainerProps) {

    // Hooks
    const videoEl = useRef<HTMLVideoElement>(null);
    const { setPlaying, setVideo, fullScreen, setVideoLength, notify, playing } = useVideo();
    const { setTitle, setOn } = notify;

    // States
    const [delayedFS, setDelayedFS] = useState(fullScreen)

    // Handlers
    const handleLoadedMetadata = () => {
        if (videoEl.current) {
            setVideoLength(prev => ({ ...prev, total: videoEl.current!.duration }))
            videoEl.current!.volume = Number(localStorage.getItem('volume') || '30') / 100;
        }
    }

    const handleVideoClick = () => {
        setPlaying(prev => !prev)
        setTitle(playing ? 'Pause' : 'Play')
        setOn(true)
    }

    // Effects
    useEffect(() => setVideo(videoEl.current as HTMLVideoElement), []); // Set video component globally
    useEffect(() => { // Delay Fullscreen styles applying due to built-in fullscreen animation

        setTimeout(() => {
            setDelayedFS(fullScreen)
        }, fullScreenDelay)

    }, [fullScreen])

    return (
        <Wrapper fullscreen={delayedFS} sx={sx}>

            <Notify notify={notify} />
            <ControlsContainer />
            <Video
                onLoadedMetadata={handleLoadedMetadata}
                onClick={handleVideoClick}
                ref={videoEl}
                src={src}
                style={{ zIndex: 0 }}
            />

        </Wrapper>
    )
}

export default VideoPlayerContainer;