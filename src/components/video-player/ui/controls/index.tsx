// Basics
import { useState, useEffect } from 'react';

// UI-libs
import { Stack } from '@mui/material';

// Insides
import { Wrapper } from './wrapper';
import { controlsFadeTime } from '../../config';
import { useVideo } from '..';

import VolumeControls from './volume-controls';
import Play from './play';
import Settings from '../settings';
import VideoLength from './video-length'
import MiniMode from './mini-mode';
import FullScreen from './fullscreen';

export default function Controls() {

    // States
    const [controlsDisplay, setControlsDisplay] = useState(false);

    // Context Values
    const { hidden } = useVideo();

    // Effects
    useEffect(() => {

        if (hidden) {
            setTimeout(() => {
                setControlsDisplay(false);
            }, controlsFadeTime * 1000)
        }
        else setControlsDisplay(true);

    }, [hidden])

    return (

        <Wrapper hidden={hidden} controlsDisplay={controlsDisplay}>

            {/* Left Side Controls */}
            <Stack direction="row" alignItems="center" sx={{ minWidth: '200px' }}>

                <Play />
                <VolumeControls />
                <VideoLength />

            </Stack>

            {/* Right Side Controls */}
            <Stack alignContent="center" direction="row">

                <Settings />
                <MiniMode />
                <FullScreen />

            </Stack>

        </Wrapper>
    )
}