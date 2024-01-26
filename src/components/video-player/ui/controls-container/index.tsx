// Basics
import { createElement as e } from "react";

// UI-libs
import { Box, BoxProps } from "@mui/material";
import styled from '@emotion/styled';

// Insides
import { useVideo } from "..";
import { miniButtonStyles } from '../controls/styles'
import { Wrapper } from "./wrapper";
import Controls from "../controls";
import Timeline from "../timeline";

// Assets
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// Interfaces
export interface ArrowProps extends BoxProps {
    hidden: boolean;
}

export const ArrowButton = styled(({ hidden, ...props }: ArrowProps) => e(Box, props)) <ArrowProps>`
    position: absolute;
    bottom: 1.6rem;
    width: 28.8px;
    height: 28.8px;
    left: calc(50% - 0.6rem);
    z-index: 2;
    pointer-events: fill;
    cursor: pointer;
    transition: all .125s ease-in-out;
    transform: ${({ hidden }) => hidden ? 'translateY(0px) rotate(180deg)' : 'translateY(0px) rotate(0deg)'};

    &:hover {
        transform: ${({ hidden }) => hidden ? 'translateY(3px) rotate(180deg)' : 'translateY(3px) rotate(0deg)'};
    }
`

// Component(s)
export default function ControlsContainer() {

    const { playing, hidden, setHidden } = useVideo()

    return (
        <Wrapper playing={playing}>

            <ArrowButton hidden={hidden} onClick={() => setHidden(prev => !prev)}>
                <KeyboardArrowDownRoundedIcon sx={miniButtonStyles} />
            </ArrowButton>

            <Timeline/>
            <Controls/>

        </Wrapper>
    )
}