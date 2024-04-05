import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ApiSlice from './apiSlice';
import authReducer from './features/Auth/authSlice';

const rootReducer = combineReducers({
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    //* here goes your all reducer like one given below
    auth: authReducer,
});

export default store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(ApiSlice.middleware);
    },
});
