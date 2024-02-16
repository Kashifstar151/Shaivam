import { createContext, useEffect, useReducer, useState } from 'react';
const initialValue = {
    metaData: {
        author: '',
        country: '',
        thalam: '',
        pann: '',
    },
    song: [],
    songDetails: [],
    title: '',
    prevId: '',
};

const songReducer = (state, action) => {
    switch (action.type) {
        case 'META_DATA':
            return { ...state, metaData: action.payload };
        case 'SET_SONG':
            return { ...state, song: action.payload };
        case 'SONG_DETAILS':
            return { ...state, songDetails: action.payload };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'PREV_ID':
            return { ...state, prevId: action.payload };
        case 'RESET':
            return initialValue;
    }
};

export const MusicContext = createContext({});
export const MusicContextProvider = ({ children }) => {
    const [musicState, dispatchMusic] = useReducer(songReducer, initialValue);

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
