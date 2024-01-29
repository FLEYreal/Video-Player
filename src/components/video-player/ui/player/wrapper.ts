// Bascis
import { createElement as e } from "react";

// UI-Libs
import { Box, BoxProps } from "@mui/material";
import styled from '@emotion/styled';

// Components & Hooks
import { Wrapper as ControlsWrapper } from '../controls-container/wrapper';

// Interfaces
export interface WrapperProps extends BoxProps {
    fullscreen: boolean;
}

// Styled
export const Wrapper = styled(({ fullscreen, ...props }: WrapperProps) => e(Box, props)) <WrapperProps>`
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000;

    position: ${props => props.fullscreen ? 'absolute' : 'relative'};
    z-index: ${props => props.fullscreen ? '1000' : '0'};
    border-radius: ${props => props.fullscreen ? '0px' : '6px'};;
    width: ${props => props.fullscreen ? '100%' : '90%'};
    max-width: ${props => props.fullscreen ? '100%' : '1200px'};
    height: ${props => props.fullscreen ? '100vh' : 'auto'};

    &:hover > ${ControlsWrapper} {
        opacity: 1;
    }
`