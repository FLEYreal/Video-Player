import { Box } from "@mui/material";

// Interface for Video Player's props
export interface VideoPlayerProps {
    src: string;
}

// Video Player
export default function VideoPlayer({ src }: VideoPlayerProps) {

    return (
        <Box>
            <video src={src} />
        </Box>
    )
}