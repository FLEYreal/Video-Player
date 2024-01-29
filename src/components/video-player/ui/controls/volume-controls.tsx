// Basics
import { useCallback, useState, useRef } from 'react';

// UI-libs
import { Box, Popover, Slider, Typography } from '@mui/material';
import styled from '@emotion/styled';

// Insides
import { miniButtonStyles } from './styles';
import { buttonColor } from '../../config';
import { useVideo } from '..';
import VideoButton from '../video-button';

// Assets
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';

export const VolumeSlider = styled(Slider)`
    color: ${buttonColor};
    width: 70px;
    margin-left: -100px;
    transition: margin-left 0.4s ease-in-out, opacity 0.15s ease-in-out 0.18s;
    opacity: 0;
`

export const VolumeSliderContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
`

export const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    transition: all 0.4s ease-in-out;

    &:hover {
        padding-right: 22px;
    }

    &:hover ${VolumeSlider} {
        margin-left: 0px;
        opacity: 1;
    }

    &:hover ${VolumeSliderContainer} {
        overflow: visible;
    }
`

export default function VolumeControls() {

    // States
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // Refs
    const popoverAnchor = useRef<HTMLElement | null>(null);

    // Context Values
    const { volume, setVolume } = useVideo();

    // Handlers
    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
    }

    const toggleVolume = useCallback(() => {
        if (volume === 0) setVolume(30)
        else setVolume(0)
    }, [setVolume, volume])

    const openPopover = () => {
        setAnchorEl(popoverAnchor.current)
    }

    const closePopover = () => {
        setAnchorEl(null)
    }

    return (
        <Wrapper>
            <VideoButton
                title="Volume Controls (↑, ↓)"
                onClick={toggleVolume}
                sx={{ pr: '16px' }}
            >
                {
                    volume === 0 ?
                        <VolumeOffRoundedIcon
                            sx={miniButtonStyles}
                        /> :

                        volume <= 15 ?
                            <VolumeMuteRoundedIcon
                                sx={miniButtonStyles}
                            /> :
                            volume <= 45 ?
                                <VolumeDownRoundedIcon
                                    sx={miniButtonStyles}
                                /> :
                                <VolumeUpRoundedIcon
                                    sx={miniButtonStyles}
                                />
                }
            </VideoButton>

            <Popover
                sx={{
                    userSelect: 'none',
                    pointerEvents: 'none',
                    opacity: 0.5,

                    '& .MuiPopover-paper': {
                        padding: '4px 12px'
                    }
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Typography>
                    {volume}%
                </Typography>
            </Popover>
            <VolumeSliderContainer onMouseEnter={openPopover} onMouseLeave={closePopover}>
                <Box
                    ref={popoverAnchor}
                    sx={{
                        width: '70px',
                        position: 'absolute',
                        top: '-10px',
                        left: '0px'
                    }}></Box>
                <VolumeSlider size="medium" value={volume} onChange={handleVolumeChange} />
            </VolumeSliderContainer>

        </Wrapper>
    )
}