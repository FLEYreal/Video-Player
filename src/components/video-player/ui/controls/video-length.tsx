// Basics
import { useEffect } from 'react';

// UI-libs
import { Typography } from '@mui/material';

// Insides
import { buttonColor } from '../../config';
import { useVideo } from '..';

export default function VideoLength() {

    // Context Values
    const { videoLength, video } = useVideo();

    return (
        <Typography sx={{ color: buttonColor, fontSize: '16px', transition: 'all 0.2s ease-in-out' }}>
            {video.duration ? `${videoLength.now} / ${videoLength.total}` : ''}
        </Typography>
    )
}