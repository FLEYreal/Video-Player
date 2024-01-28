// Basics
import { Dispatch, SetStateAction } from 'react';

// UI-libs
import { Stack, Typography, Divider, Slider, IconButton, Button } from '@mui/material';

// Insides
import { useVideo } from '..';
import { menuOptionsState } from '.';

// Assets
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export default function PlaybackRateItems({ setMenuOptions }: { setMenuOptions: Dispatch<SetStateAction<menuOptionsState>> }) {

    // Context Values
    const { speed, setSpeed } = useVideo();

    // Handlers
    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        setSpeed(newValue as number);
    }

    return (
        <>
            <Stack
                spacing={2}
                direction='row'
                alignItems='center'
                justifyContent='start'
                sx={{ margin: '8px 4rem 12px 1.5rem' }}

            >

                {/* Arrow Icon to return to main settings */}
                <IconButton onClick={() => setMenuOptions('SettingsItems')}>
                    <ArrowBackIosRoundedIcon sx={{ width: '1.15rem', height: '1.15rem' }} />
                </IconButton>

                {/* Title of option */}
                <Typography>Playback Speed</Typography>

            </Stack>

            <Divider />

            <Stack
                spacing={1}
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{ width: '100%', p: '16px 0' }}
            >

                {/* Slider to define speed */}
                <Slider value={speed} onChange={handleVolumeChange} size="medium" sx={{ width: '70%' }} />

                {/* Shows current speed & Resets speed to 1 on click */}
                <Button title="Reset" onClick={() => setSpeed(50)} sx={{ fontSize: '16px', p: '0' }}>{speed / 50}x</Button>

            </Stack>
        </>
    )

}