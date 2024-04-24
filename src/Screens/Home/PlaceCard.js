import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import ShareSVG from '../../components/SVGs/ShareSVG';
import LocationSVG from '../../components/SVGs/LocationSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../Helpers';

const PlaceCard = ({ img, templeName, address, theme }) => {
    return (
        <View
            style={{
                padding: 12,
                flexDirection: 'row',
                columnGap: 16,
                alignItems: 'center',
                backgroundColor: theme.colorscheme === 'light' ? '#fff' : '#333333',
                // backgroundColor: 'red',
                borderRadius: 10,
                // borderColor: 'black', borderWidth: 1,
                shadowColor: '#171717',
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 15,
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
                        <ShareSVG
                            fill={theme.colorscheme === 'light' ? colors.grey6 : theme.textColor}
                        />
                    </Pressable>
                    <Pressable>
                        <LocationSVG
                            fill={theme.colorscheme === 'light' ? colors.grey6 : theme.textColor}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default PlaceCard;
