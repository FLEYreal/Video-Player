// Basics
import { isFirefox } from "react-device-detect";

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
        <VideoButton title={miniMode ? "Exit Mini-Mode (I)" : "Enter Mini-Mode (I)"} sx={{ display: isFirefox ? 'none' : 'flex' }} disabled={isFirefox} onClick={toggleMiniMode}>
            <PictureInPictureAltRoundedIcon sx={miniButtonStyles} />
        </VideoButton>
    )
}