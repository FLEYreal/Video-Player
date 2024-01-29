// Basics
import { useCallback, Dispatch, SetStateAction, useState } from 'react';

// Insides
import { useVideo } from '..';
import SettingsItem from './settings-item';
import { menuOptionsState } from '.';

// Assets
import SpeedIcon from '@mui/icons-material/Speed';
import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function SettingsItems({ setMenuOptions }: { setMenuOptions: Dispatch<SetStateAction<menuOptionsState>> }) {

    // Context Values
    const { video, speed, notify } = useVideo();
    const { setTitle, setOn } = notify;

    // Loop state to update visuals
    const [loop, setLoop] = useState(video.loop)

    // Handlers
    const handleLoopChange = () => {
        video.loop = !video.loop; // Apply changes to video
        setLoop(!loop)
        setTitle(`Loop is ${!loop ? 'ON' : 'OFF'}`)
        setOn(true)
    }

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
                option={loop ? <CheckIcon /> : <CloseIcon />}
                onClick={handleLoopChange}
            />

        </>
    )

}
