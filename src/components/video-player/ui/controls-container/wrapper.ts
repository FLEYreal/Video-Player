// Basics
import { createElement as e } from "react";

// UI-libs
import { Box, BoxProps } from "@mui/material";
import styled from '@emotion/styled';

// Interface
export interface WrapperProps extends BoxProps {
    playing: boolean;
}

// Component
export const Wrapper = styled(({ playing, ...props }: WrapperProps) => e(Box, props)) <WrapperProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all .125s ease-in-out;
    font-size: 1.2rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, .6) 0%, rgba(0,0,0,0) 100%);
    width: 100%;
    height: 140px;
    z-index: 1;
    pointer-events: none;
    box-sizing: border-box;

    opacity: ${(props) => props.playing ? 0 : 1};
`