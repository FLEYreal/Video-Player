// Basics
import { ReactNode, useState, useCallback } from 'react';

// UI-libs
import { Menu, MenuItem, MenuItemProps, Stack, Typography } from '@mui/material';
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

// Interfaces
export interface SettingsItemProps extends MenuItemProps {
    icon: ReactNode;
    label: string;
    option: ReactNode;
}

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

export default function Settings() {

    // Context Values
    const { video } = useVideo();

    // States
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoop, setIsLoop] = useState(video.loop);

    // Handlers
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl, anchorEl]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLoopChange = () => {
        console.log('CLICKED')
        setIsLoop(!isLoop);
        video.loop = !video.loop;
    }

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
                onClick={handleClose}
                sx={{ borderRadius: '6px' }}
            >
                <SettingsItem icon={<SpeedIcon />} label='Playback Speed' option="1.25" />
                <SettingsItem
                    icon={<LoopIcon />}
                    label='Loop'
                    option={isLoop ? <CheckIcon /> : <CloseIcon />}
                    onClick={handleLoopChange}
                />
            </Menu>
        </>

    )
}