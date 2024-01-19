import React, { useContext } from 'react';
import { Dimensions, FlatList, Text, View, Pressable } from 'react-native';
import OmIcon from './SVGs/OmIcon';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../Context/ThemeContext';
import BookIcon from './SVGs/BookIcon';
import OmLetterSvg from './SVGs/OmLetterSvg';
import StrotasSVG from './SVGs/StrotasSVG';
import ShaivaSVG from './SVGs/ShaivaSVG';
import { RFValue } from 'react-native-responsive-fontsize';

const RenderItem = ({ item, navigation, theme }) => {
    return (
        <LinearGradient
            colors={item.gradient}
            useAngle={true}
            angle={130}
            angleCenter={{ x: 0, y: 0 }}
            style={{
                width: Dimensions.get('window').width - 70,
                backgroundColor: 'red',
                minHeight: 200,
                borderRadius: 15,
                marginRight: 15,
                marginTop: 15,
                padding: 15,
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 11,
                }}
            >
                <View style={{ justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontSize: RFValue(14, 540),
                            fontWeight: '600',
                            color: item.textColor,
                            paddingBottom: 5,
                        }}
                    >
                        {item?.text}
                    </Text>
                    <Text style={{ fontSize: RFValue(10, 540), color: item.textColor }}>
                        {item?.description}
                    </Text>
                </View>
                <OmIcon fill={theme === 'light' ? '#4C3600' : '#fff'} />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    marginVertical: 'auto',
                }}
            >
                {item.subComp.map((i, _) => (
                    <Pressable
                        onPress={
                            i?.title == 'Thirumurais'
                                ? () => navigation.navigate('Thrimurai')
                                : () => alert(true)
                        }
                        style={{
                            margin: 4,
                            width: '47.2%',
                            flexDirection: 'row',
                            padding: 12,
                            alignItems: 'center',
                            backgroundColor: theme === 'light' ? 'white' : '#494949',
                            opacity: theme === 'light' ? 0.7 : 1,
                            borderRadius: 15,
                            overflow: 'hidden',
                            flexWrap: 'nowrap',
                        }}
                    >
                        {i.icon}
                        <View
                            style={{
                                borderRightWidth: 1,
                                marginHorizontal: 12,
                                height: 20,
                                borderRightColor: item.gradient[1],
                            }}
                        ></View>
                        <Text
                            style={{
                                alignContent: 'center',
                                flex: 1,
                                color: item.textColor,
                                fontSize: RFValue(10, 540),
                            }}
                        >
                            {i.title}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </LinearGradient>
    );
};

const CardComponents = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const data = [
        {
            text: 'Sacred Texts',
            description: 'Listed to all shiva related audios here',
            id: 1,
            gradient: theme.gradientHomeCardYellow,
            textColor: theme.textColorHomeCardYellow,

            subComp: [
                { icon: <BookIcon fill={theme.textColorHomeCardYellow} />, title: 'Thirumurais' },
                { icon: <OmLetterSvg fill={theme.textColorHomeCardYellow} />, title: 'Stotras' },
                { icon: <StrotasSVG fill={theme.textColorHomeCardYellow} />, title: 'Vedas' },
                {
                    icon: <ShaivaSVG fill={theme.textColorHomeCardYellow} />,
                    title: 'Shaiva Siddanta',
                },
            ],
        },
        {
            text: 'Shaivam media',
            description: 'Listed to all shiva related audios here',
            id: 2,
            gradient: theme.gradientHomeCardGreen,
            textColor: theme.textColor,
            subComp: [
                { icon: <BookIcon fill={theme.textColor} />, title: 'Shaivam TV' },
                { icon: <OmLetterSvg fill={theme.textColor} />, title: 'Temples' },
                { icon: <StrotasSVG fill={theme.textColor} />, title: 'Radio' },
                { icon: <ShaivaSVG fill={theme.textColor} />, title: 'Calender' },
            ],
        },
        {
            text: 'More Features',
            description: 'Listed to all shiva related audios here',
            id: 3,
            gradient: theme.gradientHomeCardYellow,
            textColor: theme.textColorHomeCardYellow,

            subComp: [
                { icon: <BookIcon fill={theme.textColorHomeCardYellow} />, title: 'Kaala Puja' },
                { icon: <OmLetterSvg fill={theme.textColorHomeCardYellow} />, title: 'Quiz' },
                { icon: <StrotasSVG fill={theme.textColorHomeCardYellow} />, title: 'Favourites' },
                { icon: <ShaivaSVG fill={theme.textColorHomeCardYellow} />, title: 'Website' },
            ],
        },
    ];

    return (
        <View style={{ paddingLeft: 0 }}>
            <FlatList
                style={{ overflow: 'visible' }}
                horizontal
                renderItem={({ item, index }) => (
                    <RenderItem item={item} navigation={navigation} theme={theme.colorscheme} />
                )}
                data={data}
            />
        </View>
    );
};

export default CardComponents;
