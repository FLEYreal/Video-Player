// Basics
import React from "react";

// UI-Libs
import { Box } from "@mui/material";
import styled from '@emotion/styled';

// Components
import ControlsContainer, { Wrapper as ControlsWrapper } from "./controls";

// Interface for Video Player's props
export interface VideoPlayerProps {
    src: string;
};

// Styled
export const Wrapper = styled(Box)`
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    box-sizing: border-box;
    width: 90%;
    max-width: 1200px;
    display: flex;
    align-items: center;

    &:hover > ${ControlsWrapper} {
        opacity: 1;
    }
`

export const Video = styled.video`
    width: 100%;
`


// Video Player
export default function VideoPlayer({ src }: VideoPlayerProps) {

    return (
        <Wrapper>

            <ControlsContainer/>
            <Video src={src} />

        </Wrapper>
    )
}