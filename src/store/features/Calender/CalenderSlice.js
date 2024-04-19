import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query';
const initialAuthState = {
    accessToken: 'kya hai ',
    refreshToken: 'check purpose ',
    isLoggedIn: 'check purpose ',
    userDetails: 'check purpose ',
    // logoutCallThunk: [],
};
const CalenderSlice = createApi({
    name: 'Calender',
    initialState: initialAuthState,
    reducers: {
        fetchEventList(state, action) {
            const { data } = action.payload;
            // state.accessToken = accessToken;
            // state.refreshToken = refreshToken;
            state.userDetails = data;
            // state.isLoggedIn = true;
        },

        // signOut(state) {
        //     state.accessToken = initialAuthState.accessToken;
        //     state.refreshToken = initialAuthState.refreshToken;
        //     state.userDetails = initialAuthState.userDetails;
        //     state.isLoggedIn = false;
        // },
    },
    tagTypes: [
        'Calender'
    ]

    // extraReducers: (builder) => {
    //     builder.addCase(logoutCallThunk.fulfilled, (state, action) => {
    //         state.logoutCallThunk = action?.payload;
    //     });
    // },
});
export default CalenderSlice.reducer;
export const { fetchEventList } = CalenderSlice.actions;