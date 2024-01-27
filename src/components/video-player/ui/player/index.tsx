// Bascis
import { useEffect, useRef, memo } from "react";

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
    const { setPlaying, setVideo, fullScreen, volume } = useVideo();

    // Effects
    useEffect(() => setVideo(videoEl.current as HTMLVideoElement), []); // Set video component globally

    useEffect(() => { // Change volume
        if (videoEl.current) videoEl.current.volume = volume / 100
    }, [videoEl.current, volume]);

    return (
        <Wrapper fullscreen={fullScreen}>

            <ControlsContainer />
            <Video onClick={() => setPlaying(prev => !prev)} ref={videoEl} src={src} style={{ zIndex: 0 }} />

        </Wrapper>
    )
}

export default VideoPlayerContainer;