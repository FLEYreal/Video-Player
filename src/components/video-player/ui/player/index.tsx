// Bascis
import { useEffect, useRef } from "react";

// UI-Libs
import styled from '@emotion/styled';

// Insides
import ControlsContainer from "../controls-container";
import { useVideo, VideoPlayerContainerProps } from "..";
import { Wrapper } from './wrapper';

export const Video = styled.video`
    width: 100%;
`

// Video Player
function VideoPlayerContainer({ src }: VideoPlayerContainerProps) {

    // Hooks
    const videoEl = useRef<HTMLVideoElement>(null);
    const { setPlaying, setVideo, fullScreen, setVideoLength } = useVideo();

    // Handlers
    const handleLoadedMetadata = () => {
        if (videoEl.current) {
            setVideoLength(prev => ({ ...prev, total: videoEl.current!.duration }))
            videoEl.current!.volume = Number(localStorage.getItem('volume') || '30') / 100;
        }
    }

    // Effects
    useEffect(() => setVideo(videoEl.current as HTMLVideoElement), []); // Set video component globally

    return (
        <Wrapper fullscreen={fullScreen}>

            <ControlsContainer />
            <Video
                onLoadedMetadata={handleLoadedMetadata}
                onClick={() => setPlaying(prev => !prev)}
                ref={videoEl}
                src={src}
                style={{ zIndex: 0 }}
            />

        </Wrapper>
    )
}

export default VideoPlayerContainer;