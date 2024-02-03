# <a href="https://video-player-rust.vercel.app/">Video-Player</a>
Video-Player made with ReactJS and Material-UI by FLEYreal!

<a href="https://video-player-rust.vercel.app/">
  See Showcase Website
<img src="./public/showcase.png" alt="Showcase Image"/>
</a>

### Features
- Play / Pause
- Volume
- Fullscreen
- Mini-mode
- Hints
- Settings menu
- Loop
- Custom Speed
- Timeline / Video Length
- Hide / Show menu
- Keybinds for all operations

### Usage
```tsx

<VideoPlayer
  src={video} // Source of the video
  sx={{ width: '100%' }} // SX is Advanced Styling from MUI
  keyHandler={{keyHandler}} // Key handler is a handler that allows to apply custom keys to player.
/>

```
