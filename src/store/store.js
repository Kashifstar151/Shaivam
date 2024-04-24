import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ApiSlice, TempleApiSlice } from './apiSlice';
import authReducer from './features/Auth/authSlice';
import CalenderReducer from './features/Calender/CalenderSlice'
import FormReducer from './features/Calender/FormSlice'

const rootReducer = combineReducers({
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    [TempleApiSlice.reducerPath]: TempleApiSlice.reducer,

    //* here goes your all reducer like one given below
    // auth: authReducer,
    calender: CalenderReducer,
    form: FormReducer
});

export default store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(ApiSlice.middleware)
            .concat(TempleApiSlice.middleware);
    },
});
