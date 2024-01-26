// Basics
import { createElement as e } from 'react';

// UI-libs
import { Box, BoxProps } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react'

// Insides
import { controlsFadeIn, controlsFadeOut } from '../controls/styles'
import { controlsFadeTime } from '../../config'

// Interface
export interface WrapperProps extends BoxProps {
    hidden: boolean;
    controlsDisplay: boolean;
}

// Component
export const Wrapper = styled(({ hidden, controlsDisplay, ...props }: WrapperProps) => e(Box, props))<WrapperProps>(
    ({ hidden, controlsDisplay }) => css`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 65px;
        margin: auto 0;
        align-items: center;
        justify-content: space-between;
        pointer-events: fill;
        padding-left: 4px;
        padding-right: 16px;
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;

        display: ${controlsDisplay ? 'flex' : 'none'};
        animation: ${hidden ? css`${controlsFadeIn} ${controlsFadeTime}s forwards` : css`${controlsFadeOut} ${controlsFadeTime}s forwards`};
`
);