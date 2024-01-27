// Basics
import { useState, memo } from 'react';

// UI-libs
import { IconButton, IconButtonProps, Popover, Typography } from '@mui/material'

// Insides
import { buttonColor, buttonHighlightColor } from '../../config'

// Interfaces
export interface VideoButtonProps extends IconButtonProps {
    title?: string;
}


function VideoButton({ title, children, onClick, ...props }: VideoButtonProps) {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handlePopoverClose()
        if (onClick) onClick(event)
    }

    return (
        <>
            <IconButton
                {...props}

                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                onClick={handleClick}
                sx={{
                    color: buttonColor,
                    '&:hover': {
                        color: buttonHighlightColor,
                    },
                    ...props.sx
                }}
            >

                {children}

            </IconButton>

            {
                title ?
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                            '& .MuiPopover-paper': {
                                padding: '4px 12px'
                            }
                        }}
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ fontSize: '12px' }}>{title}</Typography>
                    </Popover>
                    : null
            }
        </>
    )
}

export default memo(VideoButton);