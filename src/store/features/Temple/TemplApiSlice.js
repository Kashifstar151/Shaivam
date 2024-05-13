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
    }),
});

export const { useGetNearByTemplesQuery, useLazyGetNearByTemplesQuery, useGetTempleDetailQuery } =
    TempleApiSliceCall;
