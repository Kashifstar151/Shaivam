import React from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'

const CardComponents = () => {
    const data = [
        {
            text: 'Sacred Texts',
            description: 'Listed to all shiva related audios here',
            id: 1,
            gradient: ['', ''],
            subComp: [
                { icon: 'icomn', title: 'Thirumurais' },
                { icon: 'icomn', title: 'Vedas' },
                { icon: 'icomn', title: 'Stotras' },
                { icon: 'icomn', title: 'Shaiva Siddanta' },
            ],
        },
        {
            text: 'Shaivam media',
            description: 'Listed to all shiva related audios here',
            id: 2,
            gradient: ['', ''],
            subComp: [
                { icon: 'icomn', title: 'Shaivam TV' },
                { icon: 'icomn', title: 'Radio' },
                { icon: 'icomn', title: 'Temples' },
                { icon: 'icomn', title: 'Calender' },
            ],
        },
        {
            text: 'More Features',
            description: 'Listed to all shiva related audios here',
            id: 3,
            gradient: ['', ''],
            subComp: [
                { icon: 'icomn', title: 'Kaala Puja' },
                { icon: 'icomn', title: 'Favourites' },
                { icon: 'icomn', title: 'Quiz' },
                { icon: 'icomn', title: 'Website' },
            ],
        },
    ];
    const renderItem = (item, index) => {
        return (
            <View
                style={{
                    width: Dimensions.get('window').width - 70,
                    backgroundColor: 'red',
                    height: 200,
                    borderRadius: 10,
                    marginRight: 10,
                }}
            >
                <Text>{item?.text}</Text>
            </View>
        );
    };
    return (
        <View style={{ paddingLeft: 0 }}>
            <FlatList horizontal renderItem={({ item, index }) => renderItem(item, index)} data={data} />
        </View>
    )
}

export default CardComponents