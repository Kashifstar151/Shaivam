import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import ShareSVG from '../../components/SVGs/ShareSVG';
import LocationSVG from '../../components/SVGs/LocationSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share'

const PlaceCard = ({ img, templeName, address, theme, prevId }) => {

    return (
        <View
            style={{
                padding: 16,
                flexDirection: 'row',
                columnGap: 16,
                alignItems: 'center',
            }}
        >
            <View>
                <Image
                    source={{
                        uri: 'http://www.photo-paysage.com/albums/userpics/10001/Cascade_-15.JPG',
                    }}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
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
                            fontSize: RFValue(14, 800),
                        }}
                    >
                        {templeName}
                    </Text>
                    <Text
                        style={{
                            color: theme.colorscheme === 'light' ? '#4C3600' : '#fff',
                            fontSize: RFValue(12, 800),
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
