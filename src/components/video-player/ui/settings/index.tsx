// Basics
import { ReactNode, useState, useCallback } from 'react';

// UI-libs
import { Menu, MenuItemProps } from '@mui/material';

// Insides
import { miniButtonStyles } from '../controls/styles';
import VideoButton from '../video-button';
import SettingsItems from './settings-items';
import PlaybackRateItems from './speed-items';

// Assets
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

// Types
export type menuOptionsState = 'SettingsItems' | 'PlaybackRateItems'

export default function Settings() {

    // States
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuOptions, setMenuOptions] = useState<menuOptionsState>('SettingsItems');

    // Handlers
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {

        // Set the anchor element for the Menu when opened
        setAnchorEl(event.currentTarget);

    }, [setAnchorEl, anchorEl]);

    const handleClose = () => {

        // Get rid of anchor (not element)
        setAnchorEl(null);

        // Get back to main settings
        setTimeout(() => {
            setMenuOptions('SettingsItems')
        }, 145)

    };

    return (
        <>

            {/* Settigns Button, opens menu on click */}
            <VideoButton title='Open Settings' onClick={handleClick}>
                <SettingsRoundedIcon sx={miniButtonStyles} />
            </VideoButton>

            {/* Settings menu, technically just a container for defining options */}
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
                sx={{
                    borderRadius: '6px',
                    transition: 'all 0.5s ease-in-out',
                    opacity: '0.9'
                }}
            >

                {/* Define what option menu to show */}
                {
                    menuOptions === 'SettingsItems' ?
                        <SettingsItems setMenuOptions={setMenuOptions} /> : // General settings menu
                        <PlaybackRateItems setMenuOptions={setMenuOptions} /> // Define video's speed menu
                }
            </Menu>
        </>

    )
}