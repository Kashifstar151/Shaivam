import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Background from '../../components/Background'
import ConstantHeader from '../../components/ConstantHeader'
import Header from '../../components/Header'
import { colors } from '../../Helpers'

const MoreOption = () => {
    const option = [
        { title: 'Language', Description: 'Your Selection', },
        { title: 'Favourite Odhuvar', Description: 'Your Selection' },
        { title: 'Go to website', Description: 'Your Selection' },
        { title: 'Website search', Description: 'Your Selection' },
        { title: 'Contact', Description: 'Your Selection' },
        { title: 'Share the app', Description: 'Your Selection' },
        { title: 'Rate the app', Description: 'Your Selection' },
        { title: 'About', Description: 'Your Selection' },
    ]
    const rednderItem = (item, index) => {
        // console.log("🚀 ~ file: MoreOption.js:19 ~ rednderItem ~ item:", item)
        return (
            <Pressable style={styles.list}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageContainer}>

                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.titleText}>
                            {item.title}
                        </Text>
                        <Text style={{ color: colors.grey6 }}>{item.Description}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <Icon name='arrow-forward-ios' size={17} color={'#C1554E'} />
                </TouchableOpacity>
            </Pressable>
        )
    }
    return (
        <View style={styles.main}>
            <Background>
                <ConstantHeader />
            </Background>
            <View style={styles.container}>
                <FlatList contentContainerStyle={{ marginTop: 20 }} renderItem={({ item, index }) => rednderItem(item, index)} data={option} />
            </View>
        </View>
    )
}
export const styles = StyleSheet.create({
    main: {},
    container: { backgroundColor: '#FFFFFF', },
    list: { flexDirection: 'row', justifyContent: 'space-between', height: 45, width: '100%', marginBottom: 10 },
    titleText: { fontSize: 14, fontFamily: 'Mulish-Bold', color: 'black', },
    imageContainer: { backgroundColor: '#F2F0F8', width: 50, height: 45 }
})
export default MoreOption