import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Background from '../../components/Background';
import NandiLogo from '../../assets/Images/NandiLogo.svg';
import HeadingComponent from './Common/HeadingComponent';
import { useTranslation } from 'react-i18next';

const TempleHeader = ({ title, subTitle }) => {
    const { t } = useTranslation();
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    paddingHorizontal: 15,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: '80%',
                    }}
                >
                    <Text style={{ fontSize: 24, fontFamily: 'Lora-SemiBold', color: '#FFF' }}>
                        {t(title) ? t(title) : title}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ fontSize: 14, fontFamily: 'Mulish-Regular', color: '#FFF' }}
                    >
                        {t(subTitle) ? t(subTitle) : subTitle}
                    </Text>
                </View>
                <NandiLogo />
            </View>
        </View>
    );
};

export default TempleHeader;
