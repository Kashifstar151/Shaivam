import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
const ThrimuraiHeader = ({ selectedHeader, setSelectedheader, item }) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const [itemWidth, setItemWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateItemWidth = () => {
            setItemWidth(Dimensions.get('window').width / 4);
        };
        const subscription = Dimensions.addEventListener('change', updateItemWidth);
        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <View>
            {selectedHeader.name == item.name ? (
                <TouchableOpacity
                    style={[
                        styles.selectedHeaderBox,
                        { backgroundColor: theme.iconHeadingColor.bgColor, width: itemWidth },
                    ]}
                    onPress={() => setSelectedheader(item)}
                >
                    {item?.activeIcon}
                    <Text
                        style={[
                            styles.headerText,
                            { fontWeight: '700', color: theme.iconHeadingColor.activeTextColor },
                        ]}
                    >
                        {t(item.name)}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={[styles.headerBox, { width: itemWidth }]}
                    onPress={() => setSelectedheader(item)}
                >
                    {item?.Icon}
                    <Text
                        style={[
                            styles.headerText,
                            {
                                color: theme.iconHeadingColor.inactiveTextColor,
                            },
                        ]}
                    >
                        {t(item.name)}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
export const styles = StyleSheet.create({
    headerBox: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 12,
        fontFamily: 'Mulish-regular',
        fontWeight: '500',
    },
    selectedHeaderBox: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#72322E',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
});
export default ThrimuraiHeader;
