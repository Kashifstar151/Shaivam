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
    }),
});

export const { useGetNearByTemplesQuery } = TempleApiSliceCall;
