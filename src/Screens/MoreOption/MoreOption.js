import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import Background from '../../components/Background'
import ConstantHeader from '../../components/ConstantHeader'
import Header from '../../components/Header'
import { colors } from '../../Helpers'
import ChooseLanguage from './ChooseLanguage'

const MoreOption = () => {
    const SheetRef = useRef(null)
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
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    const navigationHandler = (item) => {
        if (item.title == 'Language') {
            SheetRef.current.open()
        }
    }
    const rednderItem = (item, index) => {
        // console.log("🚀 ~ file: MoreOption.js:19 ~ rednderItem ~ item:", item)
        return (
            <Pressable style={styles.list} onPress={() => navigationHandler(item)} >
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
                <FlatList
                    contentContainerStyle={{ marginTop: 20 }}
                    renderItem={({ item, index }) => rednderItem(item, index)}
                    data={option}
                />
            </View>
            <View>
                <RBSheet
                    closeOnDragDown
                    ref={SheetRef}
                    height={Dimensions.get('window').height / 2}
                >
                    <ChooseLanguage setSelected={setSelectedLanguage} selected={selectedLanguage} />
                </RBSheet>
            </View>
        </View>
    );
}
export const styles = StyleSheet.create({
    main: {},
    container: { backgroundColor: '#FFFFFF', },
    list: { flexDirection: 'row', justifyContent: 'space-between', height: 45, width: '100%', marginBottom: 10 },
    titleText: { fontSize: 14, fontFamily: 'Mulish-Bold', color: 'black', },
    imageContainer: { backgroundColor: '#F2F0F8', width: 50, height: 45 }
})
export default MoreOption