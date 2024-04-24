import { TempleApiSlice } from '../../apiSlice';

const CalenderApiSlice = TempleApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNearByTemples: builder.query({
            query: (date) => {
                console.log(date, 'date from calender');
                const url = `temples?temple[coords]=${date?.latitude},${date?.longitude},150000`;
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
