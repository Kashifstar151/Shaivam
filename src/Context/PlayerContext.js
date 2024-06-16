import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [showPlayer, setShowPlayer] = useState(false);
    const [OmPlayTiming, setOmPlayTiming] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <PlayerContext.Provider
            value={{
                showPlayer,
                setShowPlayer,
                OmPlayTiming,
                setOmPlayTiming,
                isPlaying,
                setIsPlaying,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
