import ApiSlice from '../../apiSlice';

const CalenderApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getList: builder.query({
            query: (date) => {
                console.log(date, 'date from calender')
                const url = `regular-events?filters[start_date][$lte]=${getLastDayOfMonth(date)}&filters[end_date][$gte]=${date}&populate[Files][fields][0]=url&filters[status][$eq]=Approved&pagination[pageSize]=200`
                console.log("🚀 ~ url:", url)
                return {
                    url: url,
                    method: 'GET',
                }
            },
            providesTags: ['Calender'],
        }),
        addRegularEvent: builder.mutation({
            query: (data) => {
                console.log(data, 'date from calender')
                const url = `regular-events`
                console.log("🚀 ~ url:", url)
                return {
                    url: url,
                    method: 'POST',
                    body: data,
                    headers: { "Content-Type": "application/json" },
                }
            },
            providesTags: ['Calender'],
            // const url = 'regular-events',
        })
        // getList: builder.query({
        //     query: ({ date }) => ({
        //         url: `regular-events?filters[start_date][$lte]=${date}&filters[end_date][$gte]=${getLastDayOfMonth(date)}&populate[Files][fields][0]=url&filters[status][$eq]=Approved&pagination[pageSize]=200`,
        //         method: 'GET',
        //         // body: creds,
        //     }),
        //     
        // })
    }),
});
function getLastDayOfMonth(dateString) {
    console.log("🚀 ~ getLastDayOfMonth ~ dateString:", dateString)
    // Parse the start date
    const startDate = new Date(dateString);

    // Create a new Date object from the start date
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    // Format the end date as a string in 'YYYY-MM-DD' format   
    const endDateString = endDate.toISOString().split('T')[0];
    console.log("🚀 ~ getLastDayOfMonth ~ endDateString:", endDateString)

    return endDateString;
}

export const {
    useGetListQuery,
    useAddRegularEventMutation
} = CalenderApiSlice;
