// UI-libs
import { IconButton } from '@mui/material';

// Insides
import { iconButtonStyle } from './styles';
import { useVideo } from '..';

// Assets
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';


export default function Play() {

    // Context Values
    const { playing, setPlaying } = useVideo();

    return (
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
    )
}