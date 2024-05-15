import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
    console.log('🚀 ~ RenderCardForAddTemple ~ item:', item);
    return (
        <View style={style.mainBox}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View>
                    <Text style={style.heading}>{item?.attributes?.Name}</Text>
                    {item?.attributes?.location_name && (
                        <Text style={style.subHeading}>{item?.attributes?.location_name}</Text>
                    )}
                </View>
                {/* {
                    title && <StatusLabel title={'dhajkh'} />
                } */}

                <StatusLabel
                    title={item?.attributes?.status ? item?.attributes?.status : 'pending'}
                />
            </View>
            <Text style={style.dateOfCreation}>
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
        declined: {
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
        color: '#777777',
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
        color: '#222222',
        fontFamily: 'Mulish',
        fontSize: RFValue(12, 850),
    },
});
