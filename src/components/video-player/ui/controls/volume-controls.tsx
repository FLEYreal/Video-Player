// Basics
import { useCallback } from 'react';

// UI-libs
import { Box, Slider } from '@mui/material';
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

    // Context Values
    const { volume, setVolume } = useVideo();

    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
    }

    const toggleVolume = useCallback(() => {
        if (volume === 0) setVolume(30)
        else setVolume(0)
    }, [setVolume, volume])

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

            <VolumeSliderContainer>
                <VolumeSlider size="medium" value={volume} onChange={handleVolumeChange} />
            </VolumeSliderContainer>

        </Wrapper>
    )
}