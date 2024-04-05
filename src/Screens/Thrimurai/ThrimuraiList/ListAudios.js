import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import HeartSVG from "../../../components/SVGs/HeartSVG";
import { RouteTexts } from "../../../navigation/RouteText";
import MusicContainer from '../../../../assets/Images/Frame 83.svg';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { ThemeContext } from "../../../Context/ThemeContext";
import { listfavAudios } from "../../../Databases/AudioPlayerDatabase";
import { useIsFocused } from "@react-navigation/native";
const ListAudios = ({ item, navigation, listFav }) => {
    console.log("🚀 ~ ListAudios ~ item:", item, listFav)
    const theme = useContext(ThemeContext)
    const [favrted, setFavrted] = useState(false)
    useEffect(() => {
        listFav?.map((res) => {
            if (res?.id == item?.id) {
                alert(true)
                setFavrted(true)
            }
        })
    }, [])
    return (
        <Pressable
            onPress={() =>
                navigation.navigate(RouteTexts.THRIMURAI_SONG, {
                    data: item,
                })
            }
            style={{
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    paddingHorizontal: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <MusicContainer />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            // fontWeight: '600',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item?.thalamOdhuvarTamilname}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            // fontWeight: '400',
                            fontFamily: 'Mulish-Regular',
                            color: theme.textColor,
                        }}
                    >
                        {item.title}
                    </Text>
                </View>
            </View>

            <View
                style={{ flexDirection: 'row', gap: 25, paddingRight: 10 }}
            >
                <TouchableOpacity>
                    <Icon name="share" size={22} color={theme.textColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => FavouriteAudios(item)}>
                    {/* 
                                                yet isFav doesn't exist but this should be added which can show the fav and add to fav on click if its not already in fav list 
                                         */}
                    {favrted ? (
                        <AntDesign
                            name="heart"
                            size={20}
                            color={'#C1554E'}
                        />
                    ) : (
                        <HeartSVG fill={theme.textColor} />
                    )}
                </TouchableOpacity>
            </View>

            {/* <Icon name="more-vert" size={22} /> */}
        </Pressable>
    );
};

export default ListAudios;
