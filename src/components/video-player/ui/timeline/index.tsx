// Basics
import { useEffect, useState, useRef, createElement as e, forwardRef, Ref } from "react";

// UI-libs
import { Box, Paper, PaperProps, Slider, SliderProps, Typography } from "@mui/material"
import styled from "@emotion/styled"

// Insides
import { controlsFadeTime } from '../../config'
import { useVideo } from "..";

// Interfaces
export interface TimelineSliderProps extends SliderProps {
    hidden: boolean;
}

export interface HintProps extends PaperProps {
    hintX: number;
}

// Styled
export const Hint = styled(

    // Forward reference to Paper, excluding custom attributes so they didn't appeared in rendered HTML
    forwardRef(({ hintX, ...props }: HintProps, ref: Ref<HTMLDivElement>) => {
        return e(Paper, { ref, ...props })
    })

) <HintProps>`
    transition: opacity 0.1s ease-in-out;
    position: absolute;
    top: -25px;
    left: ${({ hintX }) => hintX}px;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
    padding: 3px 6px;
`

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

    &:hover ${Hint} {
        opacity: 0.5;
    }
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

    // References
    const wrapperRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);

    // Value of the timeline in percents
    const [value, setValue] = useState(0);

    // Horizontal hint's location
    const [hintX, setHintX] = useState(0)

    // Bounds state contains dynamic boundaries of the wrapper where hint can move after mouse horizontally
    const [bounds, setBounds] = useState(wrapperRef.current ? wrapperRef.current!.getBoundingClientRect() : null)

    // Handlers
    const handleTimelineChange = (_: Event, newValue: number | number[]) => {

        const { total } = videoLength; // Total video's length

        // On timeline's click, update current video's time
        video.currentTime = (newValue as number) * (total / 100);
        setValue(newValue as number);

    };

    const mouseMoveHandler = (event: MouseEvent) => {
        if (bounds) { // Boundaries have to be defined

            // Mouse location
            const mouseX = event.clientX - bounds.left;

            if (mouseX >= 0 && mouseX <= bounds.width) {

                // Setup hint's location relatively mouse, horizontally in the center
                setHintX(mouseX - (hintRef.current!.clientWidth / 2));
            }
        }
    }

    // When resizing, dynamic boundaries have to update
    const resizeHandler = () => {
        setBounds(wrapperRef.current!.getBoundingClientRect());
    }

    // Effects
    useEffect(() => {

        const { now, total } = videoLength;

        const percent = Math.floor(((now / total) * 100) * 100) / 100;
        if (percent) setValue(percent);

    }, [videoLength])

    useEffect(() => {

        if (wrapperRef.current) {

            // Apply event listeners
            window.addEventListener('resize', resizeHandler)
            wrapperRef.current.addEventListener('mousemove', mouseMoveHandler)

            // Remove on unmount
            return () => {
                window.removeEventListener('resize', resizeHandler)
                wrapperRef.current!.removeEventListener('mousemove', mouseMoveHandler)
            }

        }

    }, [wrapperRef.current, bounds])

    useEffect(() => {
        if (wrapperRef.current) setBounds(wrapperRef.current!.getBoundingClientRect())
    }, [wrapperRef.current])

    return (
        <Wrapper ref={wrapperRef}>
            <Hint hintX={hintX} ref={hintRef}>
                <Typography>3:50</Typography>
            </Hint>
            <TimelineSlider onChange={handleTimelineChange} hidden={hidden} value={value} />
        </Wrapper>
    )
}