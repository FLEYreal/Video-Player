// Basics
import { useEffect, useState, createElement as e } from "react";

// UI-libs
import { Box, Slider, SliderProps } from "@mui/material"
import styled from "@emotion/styled"

// Insides
import { controlsFadeTime } from '../../config'
import { useVideo } from "..";

// Interfaces
export interface TimelineSliderProps extends SliderProps {
    hidden: boolean;
}

// Styled
export const Wrapper = styled(Box)`
    position: absolute;
    bottom: 42px;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 1rem;
    box-sizing: border-box;
    pointer-events: fill;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TimelineSlider = styled(({ hidden, ...props }: TimelineSliderProps) => e(Slider, props)) <TimelineSliderProps>`
    transition: all ${controlsFadeTime - 0.1}s ease-in-out;
    height: 3px;

    & .MuiSlider-thumb {
        transition: all 0.1s ease-in-out;
        width: 16px;
        height: 16px;
    };

    &:hover {
        height: 8px;
    };

    &:hover .MuiSlider-thumb {
        width: 19px;
        height: 19px;
    };

    & .MuiSlider-thumb:hover {
        width: 24px;
        height: 24px;
    };

    opacity: ${({ hidden }) => hidden ? 0 : 1};
`

export default function Timeline() {

    // Context Values
    const { hidden, videoLength, video } = useVideo();

    // States
    const [value, setValue] = useState(0);

    // Handlers
    const handleTimelineChange = (_: Event, newValue: number | number[]) => {

        const { total } = videoLength;

        video.currentTime = (newValue as number) * (total / 100);
        setValue(newValue as number);
    };

    // Effects
    useEffect(() => {

        const { now, total } = videoLength;

        const percent = Math.floor(((now / total) * 100) * 100) / 100;
        if (percent) setValue(percent);

    }, [videoLength])

    return (
        <Wrapper>
            <TimelineSlider onChange={handleTimelineChange} hidden={hidden} value={value} />
        </Wrapper>
    )
}