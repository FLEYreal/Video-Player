// Bascis
import { createElement as e, useEffect, useRef } from "react";

// UI-Libs
import { Box, BoxProps } from "@mui/material";
import styled from '@emotion/styled';

// Components & Hooks
import ControlsContainer, { Wrapper as ControlsWrapper } from "./controls";
import { useVideo, VideoPlayerContainerProps } from ".";

// Interfaces
export interface WrapperProps extends BoxProps {
    fullscreen: boolean;
}

// Styled
export const Wrapper = styled(({ fullscreen, ...props }: WrapperProps) => e(Box, props)) <WrapperProps>`
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    position: ${props => props.fullscreen ? 'absolute' : 'relative'};
    z-index: ${props => props.fullscreen ? '1000' : '0'};
    border-radius: ${props => props.fullscreen ? '0px' : '6px'};;
    width: ${props => props.fullscreen ? '100%' : '90%'};
    max-width: ${props => props.fullscreen ? '100%' : '1200px'};;

    &:hover > ${ControlsWrapper} {
        opacity: 1;
    }
`

export const Video = styled.video`
    width: 100%;
`

// Video Player
export default function VideoPlayerContainer({ src }: VideoPlayerContainerProps) {

    const videoEl = useRef<HTMLVideoElement>(null);
    const { setPlaying, setVideo, fullScreen } = useVideo();

    useEffect(() => setVideo(videoEl.current as HTMLVideoElement), []);

    return (
        <Wrapper fullscreen={fullScreen}>

            <ControlsContainer />
            <Video onClick={() => setPlaying(prev => !prev)} ref={videoEl} src={src} style={{ zIndex: 0 }} />

        </Wrapper>
    )
}