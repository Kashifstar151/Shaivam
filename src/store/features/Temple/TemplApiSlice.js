import { TempleApiSlice } from '../../apiSlice';

const TempleApiSliceCall = TempleApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNearByTemples: builder.query({
            query: (data) => {
                // const url = `?temple_coordinates[coords]=${data?.longitude},${data?.latitude}&pagination[pageSize]=200`;
                // https://lobster-app-gpfv5.ondigitalocean.app/api/nearby-temples?long=77.391029&lat=28.535517&radius=15000
                // const url = `api/nearby-temples?long=${data?.longitude}&lat=${data?.latitude}&radius=15000`;
                const url = `api/nearby-temples?long=${data?.longitude}&lat=${
                    data?.latitude
                }&radius=15000${data.flag ? `&flag=${data.flag}` : ''}${
                    data?.limit ? `&limit=${data.limit}` : '&limit=100'
                }`;
                console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Temple'],
            transformResponse: (response, meta, arg) => {
                return response;
            },
        }),

        getTempleDetail: builder.query({
            query: ({ id }) => {
                const url = `api/maps/${id}?populate=temple,temple_images`;
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['TempleDetail'],
            transformResponse: (response, meta, arg) => {
                let responseToRetun = {};
                if (response?.data?.attributes) {
                    if (response?.data?.attributes?.temple?.data?.attributes) {
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

                        responseToRetun['basicDetails'] = {
                            "Lord's name": Swamy_name,
                            'Divine name': Ambal_Name,
                            'Head tree': Temple_tree ?? 'N/A',
                            Thirtham: Thirtham,
                            Worshipped: Sages_who_worshiped,
                            Location: Location,
                        };

                        responseToRetun.Specialities_Description = Specialities_Description;
                        responseToRetun.Sthala_Puranam_Description = Sthala_Puranam_Description;
                    }

                    if (response?.data?.attributes?.temple_images?.data?.length) {
                        const temple_images = response?.data?.attributes?.temple_images?.data?.map(
                            (item) => {
                                console.log('🚀 ~ 58 item:', item);
                                return {
                                    id: item?.id,
                                    url: item?.attributes?.url,
                                };
                            }
                        );

                        responseToRetun['temple_images'] = temple_images;
                    }

                    return responseToRetun;
                } else {
                    return;
                }
            },
        }),

        addTemple: builder.mutation({
            // add email field
            query: ({ Name, Description, Longitude, Latitude, email }) => {
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
                            email,
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
            invalidatesTags: ['Add_Temple_Records', 'TempleDetail'],
        }),

        getAddedTempleOnEmail: builder.query({
            query: ({ email }) => {
                console.log('🚀 ~ email:', email);
                // https://lobster-app-gpfv5.ondigitalocean.app/api/maps?filters[email][$eq]=adsfa@gmail.com

                return {
                    url: `api/maps?filters[email][$eq]=${email}`,
                    method: 'GET',
                };
            },

            transformResponse: (response, meta, arg) => {
                console.log('🚀 ~ response:', response);
                return response?.data;
                // return {
                //     data: response?.data,
                //     status: 'SUCCESS',
                // };
            },
        }),
    }),
});

export const {
    useGetNearByTemplesQuery,
    useLazyGetNearByTemplesQuery,
    useGetTempleDetailQuery,
    useAddTempleMutation,
    useAddTempleImagesMutation,
    useLazyGetAddedTempleOnEmailQuery,
} = TempleApiSliceCall;
