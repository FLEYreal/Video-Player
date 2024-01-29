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
            !fullScreen && 
            FSDelay !== null && 
            FSDelay !== undefined && 
            !FSDelay.current
        ) {
            setFullScreen(prev => !prev)
            FSDelay.current = true;
            setTimeout(() => {
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