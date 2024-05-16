import moment from 'moment';
import { ApiSlice } from '../../apiSlice';

const CalenderApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getList: builder.query({
            query: (date) => {
                let startDate = moment(date?.selectMonth).get('m') == moment().get('m') ? moment(date?.selectMonth).format('YYYY-MM-DD') : moment(date?.selectMonth).startOf('month').format('YYYY-MM-DD')
                let url = date?.selectedLocation !== null ?
                    `nearby-events?long=${date?.selectedLocation?.long}&lat=${date?.selectedLocation?.lat}&radius=1500000&start_date=${startDate}}&end_date=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}` :
                    date?.eventCategory !== null ? `nearby-events?start_date=${startDate}&end_date=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&category=${date.eventCategory}` :
                        date?.selectedLocation !== null && date?.eventCategory !== null ? `nearby-events?long=78.6801553&lat=10.8118335&radius=230000000&start_date=${startDate}&end_date=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&category=${date.eventCategory}` :
                            `nearby-events?start_date=${startDate}&end_date=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}`;
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
                    `nearby-recurring-events?schedulerType=Weekly&long=${date?.selectedLocation?.lat}&lat=${date?.selectedLocation?.lat}&radius=5000000` :
                    date?.eventCategory !== null ? `nearby-recurring-events?schedulerType=Weekly&category=${date?.eventCategory}` :
                        date?.selectedLocation !== null && date?.eventCategory !== null ? `nearby-recurring-events?schedulerType=Weekly&long=${date?.selectedLocation?.long}&lat=${date?.selectedLocation?.lat}&radius=50000&category=${date?.eventCategory}` :
                            `nearby-recurring-events?schedulerType=Weekly`;
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Calender'],
        }),
        getRecurringEventMonthly: builder.query({
            query: (date) => {
                // console.log("🚀 ~ date:", date)
                let url = date?.selectedLocation !== null ?
                    `nearby-recurring-events?long=${date?.selectedLocation?.long}&lat=${date?.selectedLocation?.lat}&radius=50000&schedulerType=Monthly` :
                    date?.eventCategory !== null ? `nearby-recurring-events?schedulerType=Monthly&category=${date?.eventCategory}` :
                        date?.selectedLocation !== null && date?.eventCategory !== null ? `nearby-recurring-events?schedulerType=Monthly&long=${date?.selectedLocation?.long}&lat=${date?.selectedLocation?.lat}&radius=50000&category=${date?.eventCategory}` :
                            `nearby-recurring-events?schedulerType=Monthly`;
                // console.log('🚀 ~ url: recurring month', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Calender'],
        }),
        getFestivalList: builder.query({
            query: (date) => {
                const url = `calendars?populate=*&filters[calendar_from_date][$gte]=${moment(date?.selectMonth).startOf('month').format('YYYY-MM-DD')}&filters[calendar_from_date][$lte]=${moment(date?.selectMonth).endOf('month').format('YYYY-MM-DD')}&sort=calendar_from_date:ASC`;
                console.log('🚀 ~ url: recuriing month', url);
                return {
                    url: url,
                    method: 'GET',
                };
            },
            providesTags: ['Calender'],
        }),
        addRegularEvent: builder.mutation({
            query: (data) => {
                const url = `https://seashell-app-vsnmp.ondigitalocean.app/api/regular-events`;
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
                const url = `https://seashell-app-vsnmp.ondigitalocean.app/api/recurring-events`;
                // console.log('🚀 ~ url:', url);
                return {
                    url: url,
                    method: 'POST',
                    // body: data,
                    // headers: { 'Content-Type': 'application/json' },
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
        getRadioList: builder.query({
            query: (data) => {
                let url = `https://prod-admin.shaivam.in/api/radios?pagination%5BpageSize%5D=3&pagination%5Bpage%5D=1&sort=language:ASC`
                return {
                    url: url,
                    method: 'GET',
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

export const { useGetListQuery, useAddRegularEventMutation, useAddImageForEventMutation, useGetRecurringEventListQuery, useGetRecurringEventMonthlyQuery, useGetFestivalListQuery, useAddRecurringEventMutation, useGetRadioListQuery } =
    CalenderApiSlice;
