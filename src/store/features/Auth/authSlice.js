import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiSlice from '../../apiSlice';
import { logoutHandler } from './authActions';
/*
    we will use the access token and refresh Token expiry time to check its validity
*/

const initialAuthState = {
    accessToken: 'kya hai ',
    refreshToken: 'check purpose ',
    isLoggedIn: 'check purpose ',
    userDetails: 'check purpose ',
    logoutCallThunk: [],
};

export const logoutCallThunk = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    thunkAPI.dispatch(ApiSlice.endpoints.logout.initiate()).then((res) => {
        window.location = '/'; // Redirect to the home page
        thunkAPI.dispatch(logoutHandler()); // Dispatch your logoutHandler action
    });
});

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            const { refreshToken, accessToken, data } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.userDetails = data;
            state.isLoggedIn = true;
        },

        signOut(state) {
            state.accessToken = initialAuthState.accessToken;
            state.refreshToken = initialAuthState.refreshToken;
            state.userDetails = initialAuthState.userDetails;
            state.isLoggedIn = false;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(logoutCallThunk.fulfilled, (state, action) => {
            state.logoutCallThunk = action?.payload;
        });
    },
});

export default authSlice.reducer;
export const { login, signOut } = authSlice.actions;
