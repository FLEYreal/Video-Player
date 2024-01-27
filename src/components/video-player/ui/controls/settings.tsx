// Basics
import { ReactNode, useState } from 'react';

// UI-libs
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

// Insides
import { miniButtonStyles } from './styles'
import VideoButton from '../video-button';

// Assets
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SpeedIcon from '@mui/icons-material/Speed';
import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// Interfaces
export interface SettingsItemProps {
    icon: ReactNode;
    label: string;
    value: ReactNode;
}

export const MenuItemTitle = styled(Typography)`
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
`

export function SettingsItem({ icon, label, value }: SettingsItemProps) {

    return (
        <MenuItem sx={{ minWidth: '260px', justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center">
                {icon}
                <MenuItemTitle>{label}</MenuItemTitle>
            </Stack>
            <Stack>
                {value}
            </Stack>
        </MenuItem>
    )

}

export default function Settings() {

    // States
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Handlers
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                sx={{ borderRadius: '6px' }}
            >
                <SettingsItem icon={<SpeedIcon />} label='Playback Speed' value="1.25" />
                <SettingsItem icon={<LoopIcon />} label='Loop' value={<CheckIcon />} />
            </Menu>
        </>

    )
}