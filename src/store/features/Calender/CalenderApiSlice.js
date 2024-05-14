import moment from 'moment';
import { ApiSlice } from '../../apiSlice';

const CalenderApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getList: builder.query({
            query: (date) => {
                console.log(date, 'date from calender');
                let url = date?.selectedLocation !== null ?
                    `regular-events?filters[start_date][$lte]=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&filters[end_date][$gte]=${moment(date?.selectMonth).startOf('month').format('YYYY-MM-DD')}&populate[Files][fields][0]=url&filters[status][$eq]=Approved&pagination[pageSize]=200&filters[Location][$lte]=${date?.selectedLocation?.name}` :
                    date?.eventCategory !== null ? `regular-events?filters[start_date][$lte]=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&filters[end_date][$gte]=${date?.selectMonth}&populate[Files][fields][0]=url&filters[status][$eq]=Approved&pagination[pageSize]=200&filters[category][$lte]=${date?.eventCategory}` :
                        date?.selectedLocation !== null && date?.eventCategory !== null ? `regular-events?filters[start_date][$lte]=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&filters[end_date][$gte]=${moment(date?.selectMonth).startOf('month').format('YYYY-MM-DD')}&populate[Files][fields][0]=url&filters[status][$eq]=Approved&pagination[pageSize]=200&filters[category][$lte]=${date?.eventCategory}&filters[Location][$lte]=${date?.selectedLocation?.name}` :
                            `regular-events?filters[start_date][$lte]=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&filters[end_date][$gte]=${moment(date?.selectMonth).startOf('month').format('YYYY-MM-DD')}&populate[Files][fields][0]=url&filters[status][$eq]=Approved&pagination[pageSize]=200`;

                console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Calender'],
        }),

        getRecurringEventList: builder.query({
            query: (date) => {
                let url = date?.selectedLocation !== null ?
                    `recurring-events?filters[SchedulaType][$eq]=Weekly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200&filters[Location][$lte]=${date?.selectedLocation?.name}` :
                    date?.eventCategory !== null ? `recurring-events?filters[SchedulaType][$eq]=Weekly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200&filters[Location][$lte]=${date?.eventCategory}` :
                        date?.selectedLocation !== null && date?.eventCategory !== null ? `recurring-events?filters[SchedulaType][$eq]=Weekly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200&filters[Location][$lte]=${date?.eventCategory}&filters[Location][$lte]=${date?.selectedLocation?.name}` :
                            `recurring-events?filters[SchedulaType][$eq]=Weekly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200`;
                // console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Calender'],
        }),
        getRecurringEventMonthly: builder.query({
            query: (date) => {
                // console.log(date, 'date from calender');
                let url = date?.selectedLocation !== null ?
                    `recurring-events?filters[SchedulaType][$eq]=Monthly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200&filters[Location][$lte]=${date?.selectedLocation?.name}` :
                    date?.eventCategory !== null ? `recurring-events?filters[SchedulaType][$eq]=Monthly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200&filters[Location][$lte]=${date?.eventCategory}` :
                        date?.selectedLocation !== null && date?.eventCategory !== null ? `recurring-events?filters[SchedulaType][$eq]=Monthly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200&filters[Location][$lte]=${date?.eventCategory}&filters[Location][$lte]=${date?.selectedLocation?.name}` :
                            `recurring-events?filters[SchedulaType][$eq]=Monthly&filters[Status][$eq]=Approval&populate[File][fields][0]=url&pagination[pageSize]=200`;
                // console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Calender'],
        }),
        getFestivalList: builder.query({
            query: (date) => {
                // console.log(date, 'date from calender');
                const url = `https://prod-admin.shaivam.in/api/calendars?populate=*&filters[calendar_from_date][$gte]=${moment(date?.selectMonth).startOf('month').format('YYYY-MM-DD')}&filters[calendar_from_date][$lte]=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&sort=calendar_from_date:ASC`;
                console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Calender'],
        }),
        addRegularEvent: builder.mutation({
            query: (data, eventType) => {
                console.log('🚀 ~ data:', data?.eventType, eventType);
                console.log('date from Virtual event', data);
                const url = `https://seashell-app-xzq8f.ondigitalocean.app/api/regular_events`;
                console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' },
                };
            },
            providesTags: ['Calender'],
            // const url = 'regular-events',
        }),
        addRecurringEvent: builder.mutation({
            query: (data, eventType) => {
                // console.log('🚀 ~ data:', data?.eventType, eventType);
                // console.log('date from calender');
                const url = `recurring-events`;
                // console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' },
                };
            },
            providesTags: ['Calender'],
            // const url = 'regular-events',
        }),
        addImageForEvent: builder.mutation({
            query: (data) => {
                console.log('🚀 ~ data:', data);
                return {
                    url: `upload`,
                    method: 'POST',
                    body: data,
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                };
            },
            providesTags: ['Calender'],
        }),
    }),
});
function getLastDayOfMonth(dateString) {
    console.log('🚀 ~ getLastDayOfMonth ~ dateString:', dateString);
    // Parse the start date
    const startDate = new Date(dateString);
    // Create a new Date object from the start date
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    // Format the end date as a string in 'YYYY-MM-DD' format
    const endDateString = endDate.toISOString().split('T')[0];
    console.log('🚀 ~ getLastDayOfMonth ~ endDateString:', endDateString);
    return endDateString;
}
function getStartDate(dateString) {
    console.log('🚀 ~ getLastDayOfMonth ~ dateString:', dateString);
    let d = dateString?.splite('-')
    d = `${d[0]}-${d[1]}-01`
    return d;
}

export const { useGetListQuery, useAddRegularEventMutation, useAddImageForEventMutation, useGetRecurringEventListQuery, useGetRecurringEventMonthlyQuery, useGetFestivalListQuery, useAddRecurringEventMutation } =
    CalenderApiSlice;
