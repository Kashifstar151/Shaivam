import { createContext, useEffect, useReducer, useState } from 'react';
const initialize = {
    metadata: {
        author: '',
        country: '',
        thalam: '',
        pann: '',
    },
    song: [],
    songDetails: [],
};

const songReducer = (state, action) => {
    switch (action.type) {
        case 'META_DATA':
            return { ...state, metadata: action.payload };
        case 'SET_SONG':
            return { ...state, song: action.payload };
        case 'SONG_DETAILS':
            return { ...state, songDetails: action.payload };
        case 'RESET':
            return initialize;
    }
};

export const MusicContext = createContext();
export const MusicContextProvider = ({ children }) => {
    const [musicState, dispatchMusic] = useReducer(songReducer, initialize);
    return (
        <MusicContext.Provider
            value={{
                musicState,
                dispatchMusic,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};
