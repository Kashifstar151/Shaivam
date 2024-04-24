import { createSlice } from '@reduxjs/toolkit';
const initialAuthState = {
    accessToken: 'kya hai ',
    refreshToken: 'check purpose ',
    isLoggedIn: 'check purpose ',
    userDetails: 'check purpose ',
};
const CalenderSlice = createSlice({
    name: 'Calender',
    initialState: initialAuthState,
    reducers: {
        fetchEventList(state, action) {
            const { data } = action.payload;

            state.userDetails = data;
        },
    },
});
export default CalenderSlice.reducer;
export const { fetchEventList } = CalenderSlice.actions;
