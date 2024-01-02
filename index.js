/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from "react-native-track-player"
import { playbaclServices } from './src/components/Playbacks/PlaybackService';
// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbaclServices);
AppRegistry.registerComponent(appName, () => App);
