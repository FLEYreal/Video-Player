// Insides
import { iconButtonStyle } from './styles';
import { useVideo } from '..';
import VideoButton from '../video-button'

// Assets
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';


export default function Play() {

    // Context Values
    const { playing, setPlaying } = useVideo();

    return (
        <VideoButton title={playing ? 'Pause (Space)' : 'Play (Space)'} onClick={() => setPlaying(prev => !prev)} sx={{ pr: '4px' }}>

            {
                playing ?

                    <PauseRoundedIcon
                        sx={iconButtonStyle}
                    /> :
                    <PlayArrowRoundedIcon
                        sx={iconButtonStyle}
                    />
            }

        </VideoButton>
    )
} null