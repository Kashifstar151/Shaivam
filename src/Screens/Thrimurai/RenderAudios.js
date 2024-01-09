import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import MusicIcon1 from '../../assets/Images/music 1.svg';
import { RouteTexts } from '../../navigation/RouteText';
import SQLite from 'react-native-sqlite-storage';
import { getSqlData } from '../Database';
import { ThemeContext } from '../../Context/ThemeContext';

const RenderAudios = ({ navigation, songs, data }) => {
    const { theme } = useContext(ThemeContext);
    const [audioData, setAudioData] = useState([]);
    useEffect(() => {
        getDtataFromSql();
    }, []);
    const getDtataFromSql = async () => {
        const query = `SELECT Thirumurai_title, prevId FROM thirumurais WHERE  fkTrimuria='${songs?.fkTrimuria}' AND pann='${songs?.pann}' ORDER BY  titleNo ASC  LIMIT 10 OFFSET 0`;
        getSqlData(query, callbacks => {
            setAudioData(callbacks)
        })
    }
    const navigationHandler = (item) => {
        navigation.navigate(RouteTexts.THRIMURAI_SONG, {
            data: item
        })
    }
    const renderAudios = (item, index) => (
        <Pressable style={{ alignItems: 'center', marginVertical: 5, width: '100%', paddingHorizontal: 20, flexDirection: 'row' }}
            onPress={() => navigationHandler(item)}>
            <View style={{ backgroundColor: '#F2F0F8', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                <MusicIcon1 />
            </View>
            <Text
                style={{
                    marginHorizontal: 10,
                    fontSize: 12,
                    fontFamily: 'AnekTamil-Regular',
                    fontWeight: '500',
                    color: theme.textColor,
                }}
            >
                {item.Thirumurai_title}
            </Text>
        </Pressable>
    );
    return (
        <View>
            <FlatList
                renderItem={({ item, index }) => renderAudios(item, index)}
                data={audioData}
            />
        </View>
    );
};

export default RenderAudios;
