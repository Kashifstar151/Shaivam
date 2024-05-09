import { createSlice } from '@reduxjs/toolkit';

const initialTempleState = {
    templeLocation: {
        coordinate: {
            latitude: null,
            longitude: null,
        },
        locationName: '',
    },
    templeName: '',
    description: '',
    imageSrc: [],
};

const templeReducer = {
    updateTheLocation: (state, action) => {
        state.templeLocation = action.payload;
    },

    updateTempleName: (state, action) => {
        state.templeName = action.payload;
    },

    updateDescription: (state, action) => {
        state.description = action.payload;
    },

    updateimageSrc: (state, action) => {
        console.log('🚀 ~ action:', action);
        state.imageSrc = action.payload;
    },
};

const templeSlice = createSlice({
    name: 'temple',
    initialState: initialTempleState,
    reducers: templeReducer,
});

export default templeSlice.reducer;
export const { updateTheLocation, updateDescription, updateTempleName, updateimageSrc } =
    templeSlice.actions;
