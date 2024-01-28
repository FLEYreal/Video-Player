// UI-libs
import { Typography } from '@mui/material';

// Insides
import { buttonColor } from '../../config';
import { useVideo } from '..';

// Format time to have additional zero if number is lower than 10
const leadingZero = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2 // Minimum digits in number is 2
})

// Format time to a nice looking and understandable string
export const formatTime = (time: number) => {

    // Define time measures
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    // Format time and return result
    if (hours === 0) return `${minutes}:${leadingZero.format(seconds)}`
    else return `${hours}:${leadingZero.format(minutes)}:${leadingZero.format(seconds)}`
}


export default function VideoLength() {

    // Context Values
    const { videoLength, video } = useVideo();

    return (
        <Typography sx={{ color: buttonColor, fontSize: '16px', transition: 'all 0.2s ease-in-out' }}>
            {video.duration ? `${formatTime(videoLength.now)} / ${formatTime(videoLength.total)}` : ''}
        </Typography>
    )
}