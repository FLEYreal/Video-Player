// Basics
import { createElement as e, useState, useEffect } from "react";
import { isFirefox } from "react-device-detect";

// UI-libs
import { Box, IconButton, BoxProps, SxProps } from "@mui/material";
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react'

// Hooks
import { useVideo } from ".";

// Assets
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FullscreenRoundedIcon from '@mui/icons-material/CropFreeRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import PictureInPictureAltRoundedIcon from '@mui/icons-material/PictureInPictureAltRounded';

// Variables
export const controlsFadeTime = 0.35;

// Interfaces
export interface WrapperProps extends BoxProps {
    playing: boolean;
}

export interface ControlsProps extends BoxProps {
    hidden: boolean;
    controlsDisplay: boolean;
}

export interface ArrowProps extends BoxProps {
    hidden: boolean;
}

// Styles
export const controlsFadeIn = keyframes`

    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(25px);
    }

`

export const controlsFadeOut = keyframes`

    0% {
        opacity: 0;
        transform: translateY(25px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }

`

export const Wrapper = styled(({ playing, ...props }: WrapperProps) => e(Box, props)) <WrapperProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .125s ease-in-out;
    font-size: 1.2rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, .6) 0%, rgba(0,0,0,0) 100%);
    width: 100%;
    height: 140px;
    z-index: 1;
    pointer-events: none;
    box-sizing: border-box;

    opacity: ${(props) => props.playing ? 0 : 1};
`

export const Controls = styled(({ hidden, controlsDisplay, ...props }: ControlsProps) => <Box {...props} />)<ControlsProps>(
    ({ hidden, controlsDisplay }) => css`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 65px;
        margin: auto 0;
        align-items: center;
        justify-content: space-between;
        pointer-events: fill;
        padding-left: 4px;
        padding-right: 16px;
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;

        display: ${controlsDisplay ? 'flex' : 'none'};
        animation: ${hidden ? css`${controlsFadeIn} ${controlsFadeTime}s forwards` : css`${controlsFadeOut} ${controlsFadeTime}s forwards`};
`
);

export const Timeline = styled(Box)`

    `

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

export const iconButtonStyle = css`
    color: #dddddd;
    width: 1.5em;
    height: 1.5em;
    transition: all .1s ease-in-out;

    &:hover {
        color: #ffffff;
    }
` as SxProps

export const miniButtonStyles = css`
    color: #dddddd;
    width: 1.2em;
    height: 1.2em;

    transition: all .1s ease-in-out;

    &:hover {
        color: #ffffff;
    }
` as SxProps

// Component(s)
export default function ControlsContainer() {

    // States
    const [controlsDisplay, setControlsDisplay] = useState(false);

    // Context Values
    const {
        playing, setPlaying,
        fullScreen, setFullScreen,
        miniMode, setMiniMode,
        hidden, setHidden,
        video
    } = useVideo();

    // Handlers
    const toggleFullScreen = () => {

        // Delay before toggling due to built-in fade animation
        setTimeout(() => {
            setFullScreen(prev => !prev);
            setMiniMode(false); // It can't be mini mode in full screen
        }, 150)

        if (fullScreen) document.exitFullscreen(); // Exit if it's full screen
        else document.documentElement.requestFullscreen(); // Enter if it's not full screen
    }

    const toggleMiniMode = () => {

        try {
            setMiniMode(prev => !prev);
            setFullScreen(false); // It can't be fullscreen with mini mode true

            if (!miniMode) {
                if (fullScreen) document.exitFullscreen(); // Exit if it's mini mode
                video.requestPictureInPicture()
            }

            else if (miniMode) {
                document.exitPictureInPicture()
            }

        } catch (e) {
            console.log('Your Browser Probably Doesn\'t Support Mini Mode!', e)
        }
    }

    // Effects
    useEffect(() => {

        if (hidden) {
            setTimeout(() => {
                setControlsDisplay(false);
            }, controlsFadeTime * 1000)
        }
        else setControlsDisplay(true);


    }, [hidden])

    return (
        <Wrapper playing={playing}>

            <ArrowButton hidden={hidden} onClick={() => setHidden(prev => !prev)}>
                <KeyboardArrowDownRoundedIcon sx={miniButtonStyles} />
            </ArrowButton>

            <Timeline></Timeline>

            <Controls hidden={hidden} controlsDisplay={controlsDisplay}>

                <Box>
                    <IconButton onClick={() => setPlaying(prev => !prev)}>

                        {
                            playing ?

                                <PauseRoundedIcon
                                    sx={iconButtonStyle}
                                /> :
                                <PlayArrowRoundedIcon
                                    sx={iconButtonStyle}
                                />
                        }
                    </IconButton>
                </Box>
                <Box>
                    <IconButton disabled={isFirefox} onClick={toggleMiniMode}>
                        <PictureInPictureAltRoundedIcon sx={isFirefox ? { display: 'none' } : miniButtonStyles} />
                    </IconButton>
                    <IconButton onClick={toggleFullScreen}>
                        {
                            fullScreen ?
                                <FullscreenExitRoundedIcon sx={miniButtonStyles} />
                                :
                                <FullscreenRoundedIcon sx={miniButtonStyles} />
                        }
                    </IconButton>
                </Box>

            </Controls>

        </Wrapper>
    )
}