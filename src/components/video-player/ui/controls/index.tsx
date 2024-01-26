// Basics
import { useState, useEffect } from 'react';
import { isFirefox } from "react-device-detect";

// UI-libs
import { Box, IconButton, Slider, Stack } from '@mui/material';

// Insides
import { miniButtonStyles, iconButtonStyle } from './styles';
import { Wrapper } from './wrapper';
import { controlsFadeTime, buttonColor } from '../../config';
import { useVideo } from '..';

// Assets
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FullscreenRoundedIcon from '@mui/icons-material/CropFreeRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import PictureInPictureAltRoundedIcon from '@mui/icons-material/PictureInPictureAltRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';

export default function Controls() {

    // States
    const [controlsDisplay, setControlsDisplay] = useState(false);

    // Context Values
    const {
        playing, setPlaying,
        fullScreen, setFullScreen,
        miniMode, setMiniMode,
        volume, setVolume,
        hidden,
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

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
    }

    const toggleVolume = () => {
        if (volume === 0) setVolume(30)
        else setVolume(0)
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

        <Wrapper hidden={hidden} controlsDisplay={controlsDisplay}>

            <Stack spacing={0} alignItems='center' direction='row' sx={{ minWidth: '200px' }}>
                <IconButton onClick={() => setPlaying(prev => !prev)} sx={{ pr: '4px' }}>

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

                <IconButton onClick={toggleVolume} sx={{ pr: '16px' }}>
                    {
                        volume === 0 ?
                            <VolumeOffRoundedIcon
                                sx={miniButtonStyles}
                            /> :

                            volume <= 15 ?
                                <VolumeMuteRoundedIcon
                                    sx={miniButtonStyles}
                                /> :
                                volume <= 45 ?
                                    <VolumeDownRoundedIcon
                                        sx={miniButtonStyles}
                                    /> :
                                    <VolumeUpRoundedIcon
                                        sx={miniButtonStyles}
                                    />
                    }
                </IconButton>

                <Slider size="medium" value={volume} onChange={handleVolumeChange} sx={{ color: buttonColor, width: '70px' }} />

            </Stack>
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

        </Wrapper>
    )
}