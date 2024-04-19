import React, { useContext, useState } from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import RadioSVG from "../../components/SVGs/RadioSVG";
import { ThemeContext } from "../../Context/ThemeContext";
import CenterIcon from '../../assets/Images/Vector (3).svg'
import Feather from "react-native-vector-icons/dist/Feather";
import ToggleSwitch from "toggle-switch-react-native";
import { colors } from "../../Helpers";
const Radios = ({ navigation }) => {
    const theme = useContext(ThemeContext)
    const [toggleOn, setToggleOn] = useState(false)
    const audioData = [
        { name: 'Radio Shiva Tattvam', description: 'Current Program: Veda darshana discourse', id: 1 },
        { name: 'Radio Shiva Tattvam', description: 'Current Program: Veda darshana discourse', id: 2 },
        { name: 'Radio Shiva Tattvam', description: 'Current Program: Veda darshana discourse', id: 3 }
    ]
    const programList = [
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 1 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 2 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 3 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 4 },
        { name: 'Ashtakam-1 Adhyayam-1', duration: '02:00', id: 5 },


    ]
    return (
        <View style={{}}>
            <Background>
                <BackButton color={true} secondMiddleText='Radio' navigation={navigation} />
                <View style={{ height: '55%' }}>
                </View>
            </Background>
            <View style={{ zIndex: 50, position: 'absolute', top: '15%', alignSelf: 'center', }}>
                <Text style={{ fontFamily: 'Lora-Bold', fontSize: 16, color: 'white', }}>Stations</Text>
                <FlatList bounces={false} data={audioData} renderItem={({ item, index }) => (
                    <Pressable style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, elevation: 10, shadowColor: 'black', shadowOffset: { height: 2, width: 1 }, shadowOpacity: 0.2, shadowRadius: 1, marginVertical: 10, backgroundColor: '#FEF0CC', height: 80, width: Dimensions.get('window').width - 30 }}>
                        <RadioSVG fill={'#4C3600'} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ color: '#4C3600', fontFamily: 'Mulish-Regular' }}>{item?.name}</Text>
                            <Text style={{ color: '#4C3600', fontFamily: 'Mulish-Regular', fontSize: 12 }}>{item?.description}</Text>
                        </View>
                        <Pressable style={{ alignItems: 'center', justifyContent: 'center', height: 40, width: 40, backgroundColor: 'white', borderRadius: 20, shadowColor: 'black', shadowOffset: { height: 2, width: 1 }, shadowOpacity: 0.2, shadowRadius: 1, }}>
                            <MaterialIcons name='play-arrow' size={24} />
                        </Pressable>
                    </Pressable>
                )} />
                <View style={{ paddingHorizontal: 10, }}>
                    <Text style={{ fontFamily: 'Lora-Bold', fontSize: 16, color: 'black', }}>Program List</Text>
                    <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>You can set reminders to each program</Text>
                    <FlatList contentContainerStyle={{ marginTop: 10 }} bounces={false} data={programList} renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', paddingHorizontal: 0, paddingVertical: 10, justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#222222', fontFamily: 'Mulish-SemiBold' }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#777777', fontSize: 12 }}>{item.duration}</Text>
                                    {
                                        index == 0 &&
                                        <View style={{ backgroundColor: '#ECCCCA', padding: 7, borderRadius: 15 }}>
                                            <Text style={{ fontSize: 12, fontFamilyl: 'Mulish-Bold', color: '#C1554E' }}>Now Playing</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name='share-2' size={20} color='#777777' />
                                <View style={{ marginHorizontal: 5 }}>
                                    <ToggleSwitch offColor={colors.grey3} onColor={'#ECCCCA'} onToggle={() => setToggleOn(!toggleOn)} isOn={toggleOn} color={'#777777'} size='small' circleColor={toggleOn ? '#C1554E' : 'white'} />
                                </View>
                            </View>
                        </View>
                    )} />
                </View>
            </View>
            {/* <View style={{ alignItems: 'center' }}>
                <CenterIcon />
                <Text style={{ fontSize: 14, fontFamily: 'Mulish-Regular', marginTop: 10 }}>Click on a radio station to see program list</Text>
            </View> */}
        </View >
    );
};

export default Radios;
