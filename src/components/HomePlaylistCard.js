import React from 'react';
import { Text, View, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EllispseSVGLeft from './SVGs/EllispseSVGLeft';
import EllipseSVGRight from './SVGs/EllipseSVGRight';
import MusiclistSVG from './SVGs/MusiclistSVG';
import PlayBtnSVG from './SVGs/PlayBtnSVG';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTranslation } from 'react-i18next';

const HomePlaylistCard = ({
    colors,
    navigation,
    heading,
    info,
    subInfo,
    songCount,
    navDetail,
    theme,
}) => {
    const { t } = useTranslation();
    return (
        <LinearGradient
            colors={colors}
            useAngle={true}
            angle={130}
            angleCenter={{ x: 0, y: 0 }}
            style={{
                width: 280,
                // backgroundColor: 'red',
                height: 165,
                borderRadius: 15,
                marginRight: 15,
                padding: 15,
                overflow: 'hidden',
            }}
        >
            <View style={{ position: 'absolute', right: -2, top: 0 }}>
                <EllipseSVGRight
                    startColor={theme.colorScheme === 'light' ? colors[0] : '#3F3F3F'}
                    stopColor={theme.colorScheme === 'light' ? colors[1] : '#464646'}
                />
            </View>

            <View style={{ position: 'absolute', left: -5, bottom: 15 }}>
                <EllispseSVGLeft
                    startColor={theme.colorScheme === 'light' ? colors[0] : '#3F3F3F'}
                    stopColor={theme.colorScheme === 'light' ? colors[1] : '#464646'}
                />
            </View>

            <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                <MusiclistSVG fill={theme.colorScheme === 'light' ? '#4C3600' : '#fff'} />
                <Text style={{ color: theme.textColor, fontSize: RFValue(12, 800) }}>
                    {t(`${heading}`)}
                </Text>
            </View>

            <Text
                style={{
                    color: theme.textColor,
                    fontSize: RFValue(14, 800),
                    paddingTop: 8,
                    paddingBottom: 4,
                }}
            >
                {info}
            </Text>
            <Text style={{ color: theme.textColor, fontSize: RFValue(12, 800) }}>{subInfo}</Text>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: theme.textColor,
                        fontWeight: '600',
                        fontSize: RFValue(12, 800),
                    }}
                >
                    {songCount} songs
                </Text>
                <Pressable style={{ position: 'relative' }}>
                    {theme.colorScheme === 'light' && (
                        <View
                            style={{
                                width: 33,
                                height: 33,
                                position: 'absolute',
                                top: 1,
                                left: 1,
                                backgroundColor: 'black',
                                opacity: 0.2,
                                borderRadius: 36,
                            }}
                        ></View>
                    )}
                    <PlayBtnSVG fill={'#4C3600'} />
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default HomePlaylistCard;
