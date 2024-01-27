// UI-libs
import { IconButton } from '@mui/material';

// Insides
import { miniButtonStyles } from './styles';
import { useVideo } from '..';
import VideoButton from '../video-button';

// Assets
import FullscreenRoundedIcon from '@mui/icons-material/CropFreeRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';

export default function FullScreen() {

    // Context Values
    const { fullScreen, setFullScreen, setMiniMode } = useVideo();

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