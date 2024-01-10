import React, { useContext } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import OmIcon from './SVGs/OmIcon';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../Context/ThemeContext';
import BookIcon from './SVGs/BookIcon';
import ScrollRoll from './SVGs/ScrollRoll';
import OmLetterSvg from './SVGs/OmLetterSvg';

const RenderItem = ({ item }) => {
    return (
        <LinearGradient
            colors={item.gradient}
            useAngle={true}
            angle={130}
            angleCenter={{ x: 0, y: 0 }}
            style={{
                width: Dimensions.get('window').width - 70,
                backgroundColor: 'red',
                height: 200,
                borderRadius: 15,
                marginRight: 15,
                padding: 15,
            }}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: item.textColor,
                            }}
                        >
                            {item?.text}
                        </Text>
                        <Text style={{ fontSize: 12, color: item.textColor }}>
                            {item?.description}
                        </Text>
                    </View>
                    <OmIcon />
                </View>

                <View style={{ paddingTop: 12, flexDirection: 'row' }}>
                    {item.subComp.map((i, _) => (
                        <View style={{ padding: 12 }}>
                            <View>{i.icon}</View>
                        </View>
                    ))}
                </View>
            </View>
        </LinearGradient>
    );
};

const CardComponents = () => {
    const { theme } = useContext(ThemeContext);
    const data = [
        {
            text: 'Sacred Texts',
            description: 'Listed to all shiva related audios here',
            id: 1,
            gradient:
                theme.colorscheme === 'light' ? ['#FEE8B3', '#FDD166'] : ['#333333', '#333333'],
            textColor: '#4C3600',

            subComp: [
                { icon: <BookIcon />, title: 'Thirumurais' },
                { icon: <ScrollRoll />, title: 'Vedas' },
                { icon: <OmLetterSvg />, title: 'Stotras' },
                { icon: <OmLetterSvg />, title: 'Shaiva Siddanta' },
            ],
        },
        {
            text: 'Shaivam media',
            description: 'Listed to all shiva related audios here',
            id: 2,
            gradient:
                theme.colorscheme === 'light' ? ['#AFD9BB', '#60B278'] : ['#333333', '#333333'],

            textColor: '#000',
            subComp: [
                { icon: <BookIcon />, title: 'Shaivam TV' },
                { icon: <ScrollRoll />, title: 'Radio' },
                { icon: <OmLetterSvg />, title: 'Temples' },
                { icon: <OmLetterSvg />, title: 'Calender' },
            ],
        },
        {
            text: 'More Features',
            description: 'Listed to all shiva related audios here',
            id: 3,
            gradient:
                theme.colorscheme === 'light' ? ['#FEE8B3', '#FDD166'] : ['#333333', '#333333'],
            textColor: '#4C3600',
            subComp: [
                { icon: <BookIcon />, title: 'Kaala Puja' },
                { icon: <ScrollRoll />, title: 'Favourites' },
                { icon: <OmLetterSvg />, title: 'Quiz' },
                { icon: <OmLetterSvg />, title: 'Website' },
            ],
        },
    ];

    return (
        <View style={{ paddingLeft: 0 }}>
            <FlatList
                horizontal
                renderItem={({ item, index }) => <RenderItem item={item} />}
                data={data}
            />
        </View>
    );
};

export default CardComponents;
