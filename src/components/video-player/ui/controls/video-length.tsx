// UI-libs
import { Typography } from '@mui/material';

// Insides
import { buttonColor } from '../../config';
import { useVideo } from '..';
import { formatTime } from '../../utils/format-time';


export default function VideoLength() {

    // Context Values
    const { videoLength, video } = useVideo();

    return (
        <Typography sx={{ color: buttonColor, fontSize: '16px', transition: 'all 0.2s ease-in-out' }}>
            {video.duration ? `${formatTime(videoLength.now)} / ${formatTime(videoLength.total)}` : ''}
        </Typography>
    )
}