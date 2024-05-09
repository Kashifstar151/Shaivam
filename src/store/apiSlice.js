import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://prod-admin.shaivam.in/api/' }), // ! add the base query of server if not auth else use baseQueryWithReAuth
    tagTypes: ['Calender'],
    endpoints: () => ({}),
});
export const TempleApiSlice = createApi({
    reducerPath: 'templeSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://lobster-app-gpfv5.ondigitalocean.app/' }), // ! add the base query of server if not auth else use baseQueryWithReAuth
    tagTypes: ['Temple'],
    endpoints: (builder) => ({}),
});

// export default ApiSlice;
