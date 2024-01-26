// UI-libs
import { SxProps } from '@mui/material'
import { keyframes, css } from "@emotion/react"
import { buttonColor, buttonHighlightColor } from '../../config';

// Animations
export const controlsFadeIn = keyframes`

    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(25px);
    }

`

export const controlsFadeOut = keyframes`

    0% {
        opacity: 0;
        transform: translateY(25px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }

`

// Styles
export const iconButtonStyle = css`
    color: ${buttonColor};
    width: 1.5em;
    height: 1.5em;
    transition: all .1s ease-in-out;

    &:hover {
        color: ${buttonHighlightColor};
    }
` as SxProps

export const miniButtonStyles = css`
    color: ${buttonColor};
    width: 1.2em;
    height: 1.2em;

    transition: all .1s ease-in-out;

    &:hover {
        color: ${buttonHighlightColor};
    }
` as SxProps