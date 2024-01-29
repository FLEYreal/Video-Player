// Basics
import { useCallback } from 'react';

// Insides
import { fullScreenDelay } from '../../config'
import { miniButtonStyles } from './styles';
import { useVideo } from '..';
import VideoButton from '../video-button';

// Assets
import FullscreenRoundedIcon from '@mui/icons-material/CropFreeRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';

export default function FullScreen() {

    // Context Values
    const { fullScreen, setFullScreen, setMiniMode, FSDelay } = useVideo();

    // Handlers
    const toggleFullScreen = useCallback(() => {
        if (
            FSDelay !== null && // Item has to be defined
            FSDelay !== undefined &&
            !FSDelay.current // Not delayed
        ) {

            setFullScreen(prev => !prev) // Change state
            FSDelay.current = true; // Set delay to true

            setTimeout(() => { // Start delay period and set delay state to false once it's done
                FSDelay.current = false;
            }, fullScreenDelay)

        }
    }, [fullScreen, setFullScreen, setMiniMode]);

    return (
        <VideoButton title={fullScreen ? "Exit full screen (ESC)" : "Enter full screen (F)"} onClick={toggleFullScreen}>
            {
                fullScreen ?
                    <FullscreenExitRoundedIcon sx={miniButtonStyles} />
                    :
                    <FullscreenRoundedIcon sx={miniButtonStyles} />
            }
        </VideoButton>
    )
}