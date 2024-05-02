import React, { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [showPlayer, setShowPlayer] = useState(false);
    const [OmPlayTiming, setOmPlayTiming] = useState(0);
    console.log('🚀 ~ PlayerProvider ~ OmPlayTiming:', OmPlayTiming);

    return (
        <PlayerContext.Provider
            value={{ showPlayer, setShowPlayer, OmPlayTiming, setOmPlayTiming }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
