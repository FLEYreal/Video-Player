import VideoPlayer from "./components/video-player/ui/video-player";

import video from './assets/video-example.mp4'

function App() {
    return (
        <>
            <VideoPlayer src={video} />
        </>
    );
}

export default App;
