import React from "react";
import TrackPlayer, {
    AppKilledPlaybackBehavior, Capability,
    RepeatMode,
} from "react-native-track-player";

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    }
    catch {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });

        isSetup = true;
    }
    finally {
        return isSetup;
    }
}

export async function addTracks() {
    await TrackPlayer.add([
        {
            id: 1,
            url: 'https://shaivamfiles.fra1.cdn.digitaloceanspaces.com/audios/OmChant.mp3',
            title: 'Fluidity',
            artist: 'tobylane',
            // duration: 60,
        }
    ]);
    // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

