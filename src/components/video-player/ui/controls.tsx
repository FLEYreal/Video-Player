// Basics
import React from "react";

// UI-libs
import { Box, IconButton } from "@mui/material";
import styled from '@emotion/styled'

// Assets
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

// Styles
export const Wrapper = styled(Box)`
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: all 0.1s ease-in-out;
`

export const Controls = styled(Box)`

`

export const Timeline = styled(Box)`

`

// Component(s)
export default function ControlsContainer() {

    return (
        <Wrapper>

            <Timeline></Timeline>

            <Controls>

                <IconButton>
                    <PlayArrowRoundedIcon sx={{
                        color: '#ffffff',
                        width: '40px',
                        height: '40px'
                    }} />
                </IconButton>

            </Controls>

        </Wrapper>
    )
}