import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MusicIcon1 from '../../assets/Images/music 1.svg';
import { RouteTexts } from '../../navigation/RouteText';
import { getSqlData } from '../Database';
import { ThemeContext } from '../../Context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const RenderAudios2 = ({ navigation, type, query }) => {
    const isFocused = useIsFocused();
    const { theme } = useContext(ThemeContext);
    const [dataLength, setDataLength] = useState(0);
    const [audioData, setAudioData] = useState([]);
    const [pageSize, setPageSize] = useState(0);

    useEffect(() => {
        getDtataFromSql2(query, type, dataLength);
    }, [isFocused]);

    const getDtataFromSql2 = async (query, type, dataLength) => {
        let updatedQuery = query;
        if (type === 'akarthi') {
            updatedQuery = `${query} OFFSET ${dataLength}`;
        }
        getSqlData(updatedQuery, (callbacks) => {
            setAudioData(callbacks);
            if (type === 'akarthi') {
                setAudioData(audioData.concat(callbacks));
                setDataLength((prev) => prev + 20);
            } else {
                setAudioData(callbacks);
            }
        });
    };

    const navigationHandler = (item) => {
        navigation.navigate(RouteTexts.THRIMURAI_SONG, {
            data: item,
        });
    };

    const renderAudios = (item, index) => (
        <Pressable
            style={{
                alignItems: 'center',
                marginVertical: 5,
                width: '100%',
                paddingHorizontal: 20,
                flexDirection: 'row',
            }}
            onPress={() => navigationHandler(item)}
        >
            <View
                style={{
                    backgroundColor: '#F2F0F8',
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 6,
                }}
            >
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
                {item?.title}
                {/* {thalam ? item?.title : item?.titleS} */}
            </Text>
        </Pressable>
    );
    return (
        <View>
            <FlatList
                nestedScrollEnabled
                renderItem={({ item, index }) => {
                    return renderAudios(item, index);
                    // return <Text>djfkdkj</Text>;
                }}
                data={audioData}
                onEndReached={
                    type === 'akarthi' ? () => getDtataFromSql2(query, type, dataLength) : null
                }
                keyExtractor={(item, indx) => indx}
            />
        </View>
    );
};

export default RenderAudios2;
