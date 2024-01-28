// Main Component
export { default as VideoPlayer } from './ui';

// Player
export { default as VideoPlayerContainer, Video } from './ui/player';
export { 
    type WrapperProps as VideoPlayerContainerWrapperProps,
    Wrapper as VideoPlayerContainerWrapper
} from './ui/player/wrapper';

// Controls Container
export {
    type ArrowProps,
    ArrowButton,
    default as ControlsContainer
} from './ui/controls-container';
export {
    type WrapperProps as ControlsContainerWrapperProps,
    Wrapper as ControlsContainerWrapper
} from './ui/controls-container/wrapper';

// Video-Button
export {
    type VideoButtonProps,
    default as VideoButton
} from './ui/video-button';

// Tineline
export {
    type TimelineSliderProps,
    Wrapper as TimelineWrapper,
    TimelineSlider,
    default as Timeline
} from './ui/timeline';

// Settings
export {
    type menuOptionsState,
    default as Settings
} from './ui/settings';
export {
    type SettingsItemProps,
    MenuItemTitle,
    default as SettingsItem
} from './ui/settings/settings-item';
export { default as SettingsItems } from './ui/settings/settings-items';
export { default as PlaybackRateItems } from './ui/settings/speed-items';

// Controls
export { default as Controls } from './ui/controls';
export { default as FullScreen } from './ui/controls/fullscreen';
export { default as MiniMode } from './ui/controls/mini-mode';
export { default as Play } from './ui/controls/play';
export {
    VolumeSlider,
    VolumeSliderContainer,
    Wrapper as VolumeControlsWrapper,
    default as VolumeControls
} from './ui/controls/volume-controls';
export {
    controlsFadeIn,
    controlsFadeOut,
    iconButtonStyle,
    miniButtonStyles
} from './ui/controls/styles';
export {
    formatTime,
    default as VideoLength
} from './ui/controls/video-length';
export {
    type WrapperProps as ControlsWrapperProps,
    Wrapper as ControlsWrapper
} from './ui/controls/wrapper';

// Config
export {
    controlsFadeTime,
    buttonColor,
    buttonHighlightColor
} from './config';