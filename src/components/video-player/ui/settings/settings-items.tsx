// Basics
import { useCallback, Dispatch, SetStateAction } from 'react';

// Insides
import { useVideo } from '..';
import SettingsItem from './settings-item';

// Assets
import SpeedIcon from '@mui/icons-material/Speed';
import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// Types
export type menuOptionsState = 'SettingsItems' | 'PlaybackRateItems'

export default function SettingsItems({ setMenuOptions }: { setMenuOptions: Dispatch<SetStateAction<menuOptionsState>> }) {

    // Context Values
    const { video, speed } = useVideo();

    // Handlers
    const handleLoopChange = useCallback(() => {
        video.loop = !video.loop; // Apply changes to video
    }, [video])

    const toSpeedOption = useCallback(() => {
        setMenuOptions('PlaybackRateItems') // Move to playback rate options
    }, [])

    return (
        <>

            <SettingsItem
                icon={<SpeedIcon />}
                label='Playback Speed'
                option={`${speed / 50}x`}
                onClick={toSpeedOption}
            />

            <SettingsItem
                icon={<LoopIcon />}
                label='Loop'
                option={video.loop ? <CheckIcon /> : <CloseIcon />}
                onClick={handleLoopChange}
            />

        </>
    )

}
