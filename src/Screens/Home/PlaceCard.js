import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import ShareSVG from '../../components/SVGs/ShareSVG';
import LocationSVG from '../../components/SVGs/LocationSVG';

const PlaceCard = ({ img, templeName, address, theme }) => {
    return (
        <View
            style={{
                padding: 16,
                flexDirection: 'row',
                columnGap: 16,
                alignItems: 'center',
                backgroundColor: theme.colorscheme === 'light' ? '#fff' : '#333333',
                borderRadius: 10,
            }}
        >
            <View>
                <Image
                    source={{
                        uri: 'https://unsplash.com/photos/a-very-tall-building-with-a-very-tall-spire-2yLvDS_jOZg',
                    }}
                    style={{ width: 50, height: 50, resizeMode: 'cover' }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <View style={{ rowGap: 5, justifyContent: 'center' }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                            fontSize: 14,
                        }}
                    >
                        {templeName}
                    </Text>
                    <Text
                        style={{
                            color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                            fontSize: 12,
                        }}
                    >
                        {address}
                    </Text>
                </View>

                <View style={{ columnGap: 24, flexDirection: 'row' }}>
                    <Pressable>
                        <ShareSVG fill={'#777777'} />
                    </Pressable>
                    <Pressable>
                        <LocationSVG fill={'#777777'} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default PlaceCard;
