import ApiSlice from '../../apiSlice';

const CalenderApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getList: builder.query({
            query: (creds) => ({
                url: `regular-events?filters[start_date][$lte]=2024-05-31&filters[end_date][$gte]=2024-05-01&populate[Files][fields][0]=url&filters[status][$eq]=Approved&pagination[pageSize]=200`,
                method: 'GET',
                // body: creds,
            }),
            providesTags: ['Calender'],
        })
        // logIn: builder.mutation({
        //     query: (creds) => ({
        //         url: '/user/login',
        //         method: 'POST',
        //         body: creds,
        //     }),
        // providesTags: ['Auth'],
        // }),

        // getOTP: builder.mutation({
        //     query: (phoneNo) => ({
        //         url: '/user/phoneAuth',
        //         method: 'POST',
        //         body: { ...phoneNo, countryCode: '+91', purpose: 'registration' },
        //     }),
        // }),

        // verifyOTP: builder.mutation({
        //     query: ({ phone, code }) => {
        //         return {
        //             url: '/user/verify',
        //             method: 'POST',
        //             body: { phone, countryCode: '+91', code },
        //         };
        //     },
        // }),

        // forgorPaswrd: builder.mutation({
        //     query: (dataForSend) => {
        //         return {
        //             url: '/user/resetPassword',
        //             method: 'POST',
        //             body: dataForSend,
        //         };
        //     },
        // }),

        // logout: builder.mutation({
        //     query: () => ({
        //         url: '/user/logout/',
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Auth'],
        // }),
    }),
});

export const {
    useGetListQuery
} = CalenderApiSlice;
