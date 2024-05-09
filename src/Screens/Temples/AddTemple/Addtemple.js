import React from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import Background from '../../../components/Background';
import TempleHeader from '../TempleHeader';
import { FlatList } from 'react-native';
import AddTempleHomePageLogo from '../../../../assets/Images/Temple/AddTempleHomePage.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomLongBtn } from '../../../components/Buttons';

const Addtemple = () => {
    // const data = [1, 2, 3, 4, 5, 6];
    const data = [];

    // for refresh
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Background force={'light'}>
                <View
                    style={{
                        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 30 : 20,
                        paddingBottom: 20,
                    }}
                >
                    <TempleHeader
                        title={'Add Temple'}
                        subTitle={'Don’t see a temple on the app? Submit the details here'}
                    />
                </View>
            </Background>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}
            >
                <FlatList
                    data={data}
                    style={
                        {
                            // flex: 1,
                        }
                    }
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    renderItem={({ item, index }) => (
                        <View>
                            <Text>{item}</Text>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={() => <EmptyList onPressOfBtn={() => {}} />}
                />
            </View>
        </View>
    );
};

const EmptyList = ({ onPressOfBtn }) => (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -50,
        }}
    >
        <AddTempleHomePageLogo />
        <View
            style={{
                paddingTop: 15,
                width: '90%',
                gap: 4,
            }}
        >
            <Text style={[style.emptyListTextColor, style.emptyListHeading]}>
                Submit your first entry here
            </Text>
            <Text style={[style.emptyListTextColor, style.emptyListSubHeading]}>
                Once submitted, our admin will look into it and the add it into the database
            </Text>
        </View>

        <View
            style={{
                width: '100%',
                paddingTop: 15,
            }}
        >
            <CustomLongBtn
                onPress={onPressOfBtn}
                text={'Add a Temple'}
                textStyle={{
                    color: '#4C3600',
                    fontFamily: 'Mulish-Bold',
                }}
                containerStyle={{
                    backgroundColor: '#FCB300',
                }}
            />
        </View>
    </View>
);

const style = StyleSheet.create({
    emptyListHeading: {
        fontFamily: 'Mulish-Bold',
        fontSize: RFValue(18, 850),
    },
    emptyListTextColor: {
        textAlign: 'center',
        color: '#000',
    },
    emptyListSubHeading: {
        fontFamily: 'Mulish',
        fontSize: RFValue(14, 850),
        textAlign: 'center',
        color: '#000',
        lineHeight: 18,
    },
});

export default Addtemple;
