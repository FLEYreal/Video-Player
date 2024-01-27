// Basics
import { createElement as e, useCallback } from "react";

// UI-libs
import styled from '@emotion/styled';

// Insides
import { useVideo } from "..";
import { miniButtonStyles } from '../controls/styles'
import { Wrapper } from "./wrapper";
import Controls from "../controls";
import Timeline from "../timeline";
import VideoButton, { VideoButtonProps } from "../video-button";

// Assets
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

// Interfaces
export interface ArrowProps extends VideoButtonProps {
    hidden: boolean;
}

export const ArrowButton = styled(({ hidden, ...props }: ArrowProps) => e(VideoButton, props)) <ArrowProps>`
    position: absolute;
    bottom: 1rem;
    width: 28.8px;
    height: 28.8px;
    left: calc(50% - 0.6rem);
    z-index: 2;
    pointer-events: fill;
    cursor: pointer;
    transition: all .125s ease-in-out;
    transform: ${({ hidden }) => hidden ? 'translateY(0px) rotate(180deg)' : 'translateY(0px) rotate(0deg)'};

    &:hover {
        transform: ${({ hidden }) => hidden ? 'translateY(5px) rotate(180deg)' : 'translateY(5px) rotate(0deg)'};
    }
`

// Component(s)
export default function ControlsContainer() {

    // Context Values
    const { playing, hidden, setHidden } = useVideo()

    // Handlers
    const handleClick = useCallback(() => {
        setHidden(!hidden)
    }, [setHidden, hidden])

    return (
        <Wrapper playing={playing}>

            <ArrowButton title={hidden ? 'Show Menu (W)' : 'Hide Menu (S)'} hidden={hidden} onClick={handleClick}>
                <KeyboardArrowDownRoundedIcon sx={miniButtonStyles} />
            </ArrowButton>

            <Timeline />
            <Controls />

        </Wrapper>
    )
}