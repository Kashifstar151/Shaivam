import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ApiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: '' }), // ! add the base query of server if not auth else use baseQueryWithReAuth
    tagTypes: ['CalendarData'],
    endpoints: (builder) => ({}),
});

export default ApiSlice;
