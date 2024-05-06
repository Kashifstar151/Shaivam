import { TempleApiSlice } from '../../apiSlice';

const CalenderApiSlice = TempleApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNearByTemples: builder.query({
            query: (date) => {
                console.log(date, 'date from calender');
                const url = `?temple_coordinates[coords]=${date?.longitude},${date?.latitude}&pagination[pageSize]=200`;
                console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'GET',
                }
            },
            providesTags: ['Temple'],
        }),

    })
});

export const {
    useGetNearByTemplesQuery
} = CalenderApiSlice;
