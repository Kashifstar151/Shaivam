import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Background from '../../components/Background';
import NandiLogo from '../../assets/Images/NandiLogo.svg';
import HeadingComponent from './Common/HeadingComponent';
import { useTranslation } from 'react-i18next';

const TempleHeader = () => {
    const { t } = useTranslation()
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
                <View>
                    <Text style={{ fontSize: 24, fontFamily: 'Lora-SemiBold', color: '#FFF' }}>
                        {t('My Trips')}
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Mulish-Regular', color: '#FFF' }}>
                        Plan your trips & save them for future
                    </Text>
                </View>
                <NandiLogo />
            </View>
        </View>
    );
};

export default TempleHeader;
