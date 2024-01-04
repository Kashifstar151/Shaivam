import React from 'react'
import { Dimensions, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardComponents from '../../components/CardComponents'
import Header from '../../components/Header'
import HeadingText from '../../components/HeadingText'
import SearchInput from '../../components/SearchInput'
import { colors } from "../../Helpers"
import '../../../localization';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const HomeScreen = () => {
    const { t, i18n } = useTranslation();
    return (
        // <SafeAreaView>

        <View style={{ flex: 1 }}>
            <View style={styles.firstContainer}>
                <Header />
                <SearchInput />
                <HeadingText text={'Shaivam Exclusive'} />
                <Text
                    style={{ color: colors.grey3, fontSize: 12, marginTop: 5, fontWeight: '600' }}
                >
                    Scroll through and check out what Shaiva, offers
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <CardComponents />
                </View>
            </View>
            <View style={styles.secondContainer}>{/* <Text>Homepage</Text> */}</View>
        </View>
        // </SafeAreaView>
    );
};
export const styles = StyleSheet.create({
    main: { flex: 1 },
    firstContainer: { backgroundColor: '#AA4A44', height: Dimensions.get('window').height / 2.5, paddingHorizontal: 15 },
    secondContainer: { backgroundColor: 'white' },
    headerContainer: { paddingTop: StatusBar.currentHeight + 50, justifyContent: 'space-between', flexDirection: 'row' },
    notificationContainer: { height: 50, width: 50, borderRadius: 25, }
})
export default HomeScreen