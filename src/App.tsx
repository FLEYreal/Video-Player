// Video-Player
import { VideoPlayer } from './components/video-player'

// Basics
import { useState } from 'react'

// Ui-Libs
import { Typography, Box, Divider, Button, Avatar, Stack, ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Assets
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import video from '../public/video-example.mp4';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

// Basic Interface made in 10 minutes in order to enhance UX
export default function App() {

    const [theme, setTheme] = useState<boolean>(false)

    return (
        /* ThemeProvider to handle dark/light theme */
        <ThemeProvider theme={!theme ? lightTheme : darkTheme}>
            <CssBaseline />
            {/* Main content container */}
            <div style={{
                marginTop: '16px',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                margin: '0 auto',
                width: '1200px'
            }}>
                {/* Header section */}
                <Box sx={{
                    mt: '20px',
                    mb: '26px'
                }}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{
                        mb: '16px'
                    }}>
                        {/* Logo and title */}
                        <Stack direction='row' justifyContent='center' alignItems='center' sx={{ gap: '8px' }}>
                            <AccessibleForwardIcon sx={{ width: '32px', height: '32px' }} />
                            <Typography sx={{ fontSize: '20px' }}>
                                <span style={{ fontWeight: '600' }}>
                                    FLEYTUBE
                                </span> : Player Showcase
                            </Typography>
                        </Stack>
                        {/* Theme switch button */}
                        <Button onClick={() => setTheme(!theme)} variant='outlined' startIcon={<LightbulbRoundedIcon />}>
                            {theme ? 'Light' : 'Dark'}
                        </Button>
                    </Stack>
                    <Divider />
                </Box>

                {/* Video player section */}
                <VideoPlayer src={video} sx={{ width: '100% !important' }} />

                {/* Details and actions section */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        mt: '24px', mb: '20px'
                    }}>
                    {/* Video details */}
                    <Box>
                        <Typography sx={{ fontSize: '20px', mb: '6px' }}>
                            A Showcase of the Player, check it out!
                        </Typography>
                        <Typography sx={{ fontSize: '15px', color: '#858585' }}>
                            24 October, 2022
                        </Typography>
                    </Box>
                    {/* Action buttons */}
                    <Box sx={{ gap: '12px', display: 'flex' }}>
                        <Button variant='outlined' disableElevation>Share</Button>
                        <Button variant='outlined' disableElevation>Save</Button>
                        <Button variant='outlined' disableElevation>Clip</Button>
                    </Box>
                </Stack>

                {/* Divider */}
                <Divider />

                {/* Channel information and subscribe button */}
                <Stack direction='row' alignItems='center' sx={{ mt: '20px', mb: '100px' }}>
                    <Avatar sx={{ width: '42px', height: '42px', mr: '12px' }} />
                    <Stack justifyContent='center' sx={{ mr: '24px' }}>
                        <Typography sx={{ fontSize: '16px' }}>
                            FLEYreal
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#858585' }}>
                            560M Subscribers
                        </Typography>
                    </Stack>
                    <Button color="error" variant='contained' disableElevation>
                        Subscribe
                    </Button>
                </Stack>
            </div>
        </ThemeProvider>
    )
}