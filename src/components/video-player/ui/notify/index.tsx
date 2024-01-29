// Basics
import { useEffect, useState } from 'react';

// UI-libs
import { Box, Paper, Typography } from "@mui/material";
import { notifyProps } from '..';

// Interfaces
export interface NotifyProps {
    notify: notifyProps
}

// Component
export default function Notify({ notify }: NotifyProps) {

    const { on, setOn, title } = notify;
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (on && !timeoutId) {
            let timeoutId = setTimeout(() => {
                if (on) {
                    setOn(false);
                    setTimeoutId(null);
                }
            }, 500)
            setTimeoutId(timeoutId);
        }
    }, [on, title])

    return (
        <Box sx={{
            width: '100%',
            position: 'absolute',
            top: '40px',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Paper
                sx={{
                    opacity: on ? 0.75 : 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px 18px',
                    minHeight: '30px',
                    transition: 'all 0.25s ease-in-out',
                }}
            >
                <Typography>
                    {title}
                </Typography>
            </Paper>
        </Box>
    )
}