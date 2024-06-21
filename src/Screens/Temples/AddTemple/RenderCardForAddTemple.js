import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useContext } from 'react';

/*
    item must be like as :{
        templeName:"",
        locationName:"",
        status:"",
        submittedDate:""
    }
*/

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
export const RenderCardForAddTemple = ({ item }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <View
            style={[
                style.mainBox,
                {
                    backgroundColor: theme.colorscheme === 'light' ? 'white' : '#3a3a3a',
                },
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View>
                    <Text
                        style={[
                            style.heading,
                            {
                                color: theme.colorscheme === 'light' ? '#000' : '#fff',
                            },
                        ]}
                    >
                        {item?.attributes?.Name}
                    </Text>
                    {item?.attributes?.location_name && (
                        <Text
                            style={[
                                style.subHeading,
                                {
                                    color: theme.colorscheme === 'light' ? '#777777' : '#fff7',
                                },
                            ]}
                        >
                            {item?.attributes?.location_name}
                        </Text>
                    )}
                </View>
                {/* {
                    title && <StatusLabel title={'dhajkh'} />
                } */}

                <StatusLabel
                    title={item?.attributes?.status ? item?.attributes?.status : 'pending'}
                />
            </View>
            <Text
                style={[
                    style.dateOfCreation,
                    {
                        color: theme.colorscheme === 'light' ? '#222222' : '#fff8',
                    },
                ]}
            >
                Submitted on: {formatDate(item?.attributes?.createdAt)}
            </Text>
        </View>
    );
};

const StatusLabel = ({ title }) => {
    const colorScheme = {
        pending: {
            bgColor: '#FEE8B3',
            color: '#000',
        },
        approved: {
            bgColor: '#60B278',
            color: '#fff',
        },
        rejected: {
            bgColor: '#FFF5F5',
            color: '#000',
        },
    };
    return (
        <Text
            style={[
                style.status,
                {
                    color: colorScheme?.[title.toLowerCase()]?.color ?? '#4C3600',
                    backgroundColor: colorScheme?.[title.toLowerCase()]?.bgColor ?? '#FCB300',
                },
            ]}
        >
            {title}
        </Text>
    );
};

const style = StyleSheet.create({
    mainBox: {
        backgroundColor: 'white',
        marginHorizontal: 20,

        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
        elevation: 10,
        gap: 15,

        // paddingHorizontal: 20,
    },
    heading: {
        fontFamily: 'Mulish-Bold',
        fontSize: RFValue(16, 850),
        lineHeight: 21,
        color: '#000',
    },
    subHeading: {
        fontFamily: 'Mulish-Medium',
        fontSize: RFValue(14, 850),
        lineHeight: 17,
    },
    status: {
        fontFamily: 'Mulish-Bold',
        fontSize: RFValue(12, 850),
        lineHeight: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    dateOfCreation: {
        fontFamily: 'Mulish',
        fontSize: RFValue(12, 850),
    },
});
