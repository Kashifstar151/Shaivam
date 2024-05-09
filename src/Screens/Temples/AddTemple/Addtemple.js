import React from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import Background from '../../../components/Background';
import TempleHeader from '../TempleHeader';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { EmptyList } from './EmptyList';
import { RenderCardForAddTemple } from './RenderCardForAddTemple';

const Addtemple = ({ navigation }) => {
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
                    renderItem={({ item, index }) => <RenderCardForAddTemple item={item} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={() => (
                        <EmptyList onPressOfBtn={() => {}} navigation={navigation} />
                    )}
                />
            </View>
        </View>
    );
};

const style = StyleSheet.create({});

export default Addtemple;
