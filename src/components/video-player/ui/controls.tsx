// Basics
import { createElement as e } from "react";
import { isFirefox } from "react-device-detect";

// UI-libs
import { Box, IconButton, BoxProps, css, SxProps } from "@mui/material";
import styled from '@emotion/styled';

// Hooks
import { useVideo } from ".";

// Assets
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import FullscreenRoundedIcon from '@mui/icons-material/CropFreeRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import PictureInPictureAltRoundedIcon from '@mui/icons-material/PictureInPictureAltRounded';

// Interfaces
export interface WrapperProps extends BoxProps {
    playing: boolean;
}

export interface ControlsProps extends BoxProps {
    hidden: boolean;
}

// Styles
export const Wrapper = styled(({ playing, ...props }: WrapperProps) => e(Box, props)) <WrapperProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .125s ease-in-out;
    font-size: 1.2rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, .55) 0%, rgba(0,0,0,0) 100%);
    width: 100%;
    height: 120px;
    z-index: 1;
    pointer-events: none;
    box-sizing: border-box;

    opacity: ${(props) => props.playing ? 0 : 1};
`

export const Controls = styled(({ hidden, ...props }: ControlsProps) => e(Box, props)) <ControlsProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65px;
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: fill;
    padding-left: 4px;
    padding-right: 16px;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;

    opacity: ${(props) => props.hidden ? 0 : 1};
`

export const Timeline = styled(Box)`

`

export const ArrowButton = styled(Box)`
    position: absolute;
    bottom: 1.6rem;
    width: 1.2rem;
    height: 1.2rem;
    left: calc(50% - 0.6rem);
    z-index: 2;
    pointer-events: fill;
    cursor: pointer;
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

    return (
        <Wrapper playing={playing}>

            <ArrowButton onClick={() => setHidden(prev => !prev)}>
                <KeyboardArrowDownRoundedIcon sx={miniButtonStyles} />
            </ArrowButton>

            <Timeline></Timeline>

            <Controls hidden={hidden}>

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