import React, { useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Entypo'
import Background from '../../components/Background'
import HeadingText from '../../components/HeadingText'
import SearchInput from '../../components/SearchInput'
import HeadingComponent from '../Temples/Common/HeadingComponent'
import InActiveCalender from "../../assets/Images/UnactiveCalender.svg"
import ActiveStar from "../../assets/Images/ActiveStar.svg"
import InActiveStar from "../../assets/Images/UnactiveStart.svg"
import ActiveCalender from "../../assets/Images/CalenderAct.svg"


const Calender = () => {
    const data = [
        { name: 'Festivals', selected: <ActiveStar />, unSelected: <InActiveStar /> },
        { name: 'Events', selected: <ActiveCalender />, unSelected: <InActiveCalender /> },
    ]
    const [selectedHeader, setSelectedheader] = useState()
    return (
        <View style={{ flex: 1 }}>
            <Background >
                <View>
                    <View style={styles.HeadeingContainer}>
                        <HeadingText text={'Calenders'} nandiLogo={true} />
                    </View>
                    <View style={styles.SearchInputContainer}>
                        <View style={{ width: '84%' }}>
                            <SearchInput placeholder={'Search for Festivals/events'} />
                        </View>
                        <TouchableOpacity style={styles.AddBtnContainer}>
                            <Icon name='plus' size={28} color='#222222' />
                        </TouchableOpacity>
                    </View>

                    <FlatList contentContainerStyle={{ paddingHorizontal: 15, marginVertical: 10 }} horizontal data={data} renderItem={({ item, index }) => (
                        <HeadingComponent selectedHeader={selectedHeader} setHeader={setSelectedheader} item={item} index={index} />
                    )} />
                </View>
            </Background>
        </View>
    )
}
export const styles = StyleSheet.create({
    HeadeingContainer: { paddingHorizontal: 15, justifyContent: 'center', marginVertical: 15 },
    SearchInputContainer: { flexDirection: 'row', },
    AddBtnContainer: { backgroundColor: '#FCB300', height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }
})
export default Calender