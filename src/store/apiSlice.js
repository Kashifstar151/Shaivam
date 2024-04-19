import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ApiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://prod-admin.shaivam.in/api/' }), // ! add the base query of server if not auth else use baseQueryWithReAuth
    tagTypes: ['Calendar'],
    endpoints: () => ({}),
});

export default ApiSlice;
