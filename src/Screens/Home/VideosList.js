import React from 'react';
import { Image, Text, View } from 'react-native';
import bgImg from '../../../assets/Images/Background.png';
import { FlatList } from 'react-native-gesture-handler';

const videoDetails = [
    {
        url: '',
        title: 'Tutorial Video 1',
        subTitle: 'Shaivam Home',
    },

    {
        url: '',
        title: 'Tutorial Video 2',
        subTitle: 'Shaivam Home',
    },
    {
        url: '',
        title: 'Tutorial Video 3',
        subTitle: 'Shaivam Home',
    },
    {
        url: '',
        title: 'Tutorial Video 4',
        subTitle: 'Shaivam Home',
    },
];

const RenderContent = ({ item, screenWidth }) => {
    console.log('🚀 ~ RenderContent ~ item:', item.title);
    return (
        <View
            style={{
                paddingVertical: 15,
                gap: 10,
                margin: 10,
                width: screenWidth * 0.83,
            }}
        >
            <View
                style={{
                    height: 180,
                    overflow: 'hidden',
                    borderRadius: 10,
                }}
            >
                <Image source={bgImg} resizeMode="cover" />
            </View>
            <View>
                <Text style={{ fontFamily: 'Mulish-Bold', fontSize: 14, color: '#fff' }}>
                    {item?.title}
                </Text>
                <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12, color: '#fff' }}>
                    {item?.subTitle}
                </Text>
            </View>
        </View>
    );
};
const VideosList = ({ screenDimension }) => {
    console.log('🚀 ~ VideosList ~ screenDimension:', screenDimension);
    const { screenWidth } = screenDimension;
    return (
        <FlatList
            data={videoDetails}
            horizontal
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
                <RenderContent item={item} screenWidth={screenWidth} />
            )}
        />
    );
};

export default VideosList;
