import { TempleApiSlice } from '../../apiSlice';

const TempleApiSliceCall = TempleApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNearByTemples: builder.query({
            query: (date) => {
                console.log(date, 'date from calender');
                // const url = `?temple_coordinates[coords]=${date?.longitude},${date?.latitude}&pagination[pageSize]=200`;
                // https://lobster-app-gpfv5.ondigitalocean.app/api/nearby-temples?long=77.391029&lat=28.535517&radius=15000
                const url = `api/nearby-temples?long=${date?.longitude}&lat=${date?.latitude}&radius=15000`;
                console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Temple'],
        }),

        getTempleDetail: builder.query({
            query: ({ id }) => {
                const url = `api/maps/${id}?populate=temple`;
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['TempleDetail'],
            transformResponse: (response, meta, arg) => {
                if (response?.data?.attributes?.temple?.data) {
                    const {
                        Swamy_name,
                        Ambal_Name,
                        Temple_tree,
                        Thirtham,
                        Sages_who_worshiped,
                        Location,
                        Specialities_Description,
                        Sthala_Puranam_Description,
                    } = response?.data?.attributes?.temple?.data?.attributes;
                    return {
                        basicDetails: {
                            "Lord's name": Swamy_name,
                            'Divine name': Ambal_Name,
                            'Head tree': Temple_tree ?? 'N/A',
                            Thirtham: Thirtham,
                            Worshipped: Sages_who_worshiped,
                            Location: Location,
                        },

                        Specialities_Description,
                        Sthala_Puranam_Description,
                    };
                } else {
                    return;
                }
            },
        }),

        addTemple: builder.mutation({
            // add email field
            query: ({ Name, Description, Longitude, Latitude }) => {
                console.log('🚀 ~ Name, Description, Longitude, Latitude :', {
                    Name,
                    Description,
                    Longitude,
                    Latitude,
                });
                const url = `api/maps`;
                return {
                    url: url,
                    method: 'POST',
                    body: {
                        data: {
                            Name,
                            Description,
                            Longitude,
                            Latitude,
                        },
                    },
                    headers: { 'Content-Type': 'application/json' },
                };
            },
            transformResponse: (response, meta, arg) => {
                return {
                    data: response?.data,
                    status: 'SUCCESS',
                };
            },
            transformErrorResponse: (response, meta, arg) => {
                return {
                    status: 'FAILED',
                    error: response?.data?.error,
                };
            },
            invalidatesTags: ['Add_Temple_Records'],
        }),

        addTempleImages: builder.mutation({
            // add email field
            query: (data) => {
                return {
                    url: `/api/upload`,
                    method: 'POST',
                    body: data,
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                };
            },
            invalidatesTags: ['Add_Temple_Records'],
        }),

        getAllTemplesAddRequest: builder.query({
            // add email field
            query: ({ email }) => {
                const url = `api/maps/${id}?filters[email][$eq]=${email}?populate=temple`;
                return {
                    url: url,
                    method: 'GET',
                    body: {
                        Name,
                        Description,
                        Longitude,
                        Latitude,
                        temple_images,
                    },
                };
            },
            invalidatesTags: ['Add_Temple_Records'],
        }),
    }),
});

export const {
    useGetNearByTemplesQuery,
    useLazyGetNearByTemplesQuery,
    useGetTempleDetailQuery,
    useAddTempleMutation,
    useAddTempleImagesMutation,
} = TempleApiSliceCall;
