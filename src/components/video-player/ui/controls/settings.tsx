// Basics
import { ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect } from 'react';

// UI-libs
import { Menu, MenuItem, MenuItemProps, Stack, Typography, Divider, Slider, IconButton, Button } from '@mui/material';
import styled from '@emotion/styled';

// Insides
import { miniButtonStyles } from './styles'
import { useVideo } from '..';
import VideoButton from '../video-button';

// Assets
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SpeedIcon from '@mui/icons-material/Speed';
import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

// Interfaces
export interface SettingsItemProps extends MenuItemProps {
    icon: ReactNode;
    label: string;
    option: ReactNode;
}

export type menuOptionsState = 'SettingsItems' | 'PlaybackRateItems'

export const MenuItemTitle = styled(Typography)`
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
`

export function SettingsItem({ icon, label, option, ...props }: SettingsItemProps) {

    return (
        <MenuItem sx={{ minWidth: '260px', justifyContent: 'space-between' }} {...props}>
            <Stack direction="row" alignItems="center">
                {icon}
                <MenuItemTitle>{label}</MenuItemTitle>
            </Stack>
            <Stack>
                {option}
            </Stack>
        </MenuItem>
    )

}

export function SettingsItems({ setMenuOptions }: { setMenuOptions: Dispatch<SetStateAction<menuOptionsState>> }) {

    // Context Values
    const { video, speed } = useVideo();

    // States
    const [isLoop, setIsLoop] = useState(video.loop);

    const handleLoopChange = () => {
        setIsLoop(!isLoop);
        video.loop = !video.loop;
    }

    return (
        <>
            <SettingsItem
                icon={<SpeedIcon />}
                label='Playback Speed'
                option={`${speed / 50}x`}
                onClick={() => setMenuOptions('PlaybackRateItems')}
            />
            <SettingsItem
                icon={<LoopIcon />}
                label='Loop'
                option={isLoop ? <CheckIcon /> : <CloseIcon />}
                onClick={handleLoopChange}
            />
        </>
    )

}

export function PlaybackRateItems({ setMenuOptions }: { setMenuOptions: Dispatch<SetStateAction<menuOptionsState>> }) {

    // Context Values
    const { speed, setSpeed } = useVideo();

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        setSpeed(newValue as number);
    }

    useEffect(() => {
        if (localStorage.getItem('speed')) setSpeed(Number(localStorage.getItem('speed')))
        else {
            localStorage.setItem('speed', String(speed))
        };
    }, [])

    return (
        <>
            <Stack spacing={2} direction='row' alignItems='center' justifyContent='start' sx={{ margin: '8px 4rem 12px 1.5rem' }}>
                <IconButton onClick={() => setMenuOptions('SettingsItems')}>
                    <ArrowBackIosRoundedIcon sx={{ width: '1.15rem', height: '1.15rem' }} />
                </IconButton>
                <Typography>Playback Speed</Typography>
            </Stack>
            <Divider />
            <Stack spacing={1} direction='column' alignItems='center' justifyContent='center' sx={{ width: '100%', p: '16px 0' }}>
                <Slider value={speed} onChange={handleVolumeChange} size="medium" sx={{ width: '70%' }} />
                <Button title="Reset" onClick={() => setSpeed(50)} sx={{ fontSize: '16px', p: '0' }}>{speed / 50}x</Button>
            </Stack>
        </>
    )

}

export default function Settings() {

    // States
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuOptions, setMenuOptions] = useState<menuOptionsState>('SettingsItems');

    // Handlers
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl, anchorEl]);

    const handleClose = () => {
        setAnchorEl(null);
        setTimeout(() => {
            setMenuOptions('SettingsItems')
        }, 145)
    };

    return (
        <>
            <VideoButton title='Open Settings' onClick={handleClick}>
                <SettingsRoundedIcon sx={miniButtonStyles} />
            </VideoButton>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClose={handleClose}
                sx={{ borderRadius: '6px', transition: 'all 0.2s ease-in-out' }}
            >
                {
                    menuOptions === 'SettingsItems' ?
                        <SettingsItems setMenuOptions={setMenuOptions} /> :
                        <PlaybackRateItems setMenuOptions={setMenuOptions} />
                }
            </Menu>
        </>

    )
}