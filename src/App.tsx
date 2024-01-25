// Basics
import React from 'react';

// Video-Player
import { VideoPlayer } from './components/video-player'

// Assets
import video from '../public/video-example.mp4';

export default function App() {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            <VideoPlayer src={video} />
        </div>
    )
}