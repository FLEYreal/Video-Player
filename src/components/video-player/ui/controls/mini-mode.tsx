// Basics
import { isFirefox } from "react-device-detect";
import { useCallback } from "react";

// Insides
import { miniButtonStyles } from './styles';
import { useVideo } from '..'
import VideoButton from '../video-button';

// Assets
import PictureInPictureAltRoundedIcon from '@mui/icons-material/PictureInPictureAltRounded';

export default function MiniMode() {

    // Context Values
    const {
        fullScreen, setFullScreen,
        miniMode, setMiniMode,
        video
    } = useVideo();

    const toggleMiniMode = useCallback(() => {

        try {
            setMiniMode(prev => !prev);
            setFullScreen(false); // It can't be fullscreen with mini mode true

            if (!miniMode) {
                if (fullScreen) setFullScreen(prev => !prev) // Exit if it's mini mode
                video.requestPictureInPicture()
            }

            else if (miniMode) {
                document.exitPictureInPicture()
            }

        } catch (e) {
            console.log('Your Browser Probably Doesn\'t Support Mini Mode!', e)
        }
    }, [miniMode, fullScreen, setFullScreen, setMiniMode, video]);

    return (
        <VideoButton 
            title={miniMode ? "Exit Mini-Mode (I)" : "Enter Mini-Mode (I)"} 
            sx={{ display: isFirefox ? 'none' : 'flex' }}
            disabled={isFirefox}
            onClick={toggleMiniMode}
        >
            <PictureInPictureAltRoundedIcon sx={miniButtonStyles} />
        </VideoButton>
    )
}