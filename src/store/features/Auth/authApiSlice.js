import ApiSlice from '../../apiSlice';

const authApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: (creds) => ({
                url: '/user/login',
                method: 'POST',
                body: creds,
            }),
            providesTags: ['Auth'],
        }),

        getOTP: builder.mutation({
            query: (phoneNo) => ({
                url: '/user/phoneAuth',
                method: 'POST',
                body: { ...phoneNo, countryCode: '+91', purpose: 'registration' },
            }),
        }),

        verifyOTP: builder.mutation({
            query: ({ phone, code }) => {
                return {
                    url: '/user/verify',
                    method: 'POST',
                    body: { phone, countryCode: '+91', code },
                };
            },
        }),

        forgorPaswrd: builder.mutation({
            query: (dataForSend) => {
                return {
                    url: '/user/resetPassword',
                    method: 'POST',
                    body: dataForSend,
                };
            },
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/user/logout/',
                method: 'DELETE',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useLogInMutation,
    useLogoutMutation,
    useForgorPaswrdMutation,
    useGetOTPMutation,
    useVerifyOTPMutation,
} = authApiSlice;
