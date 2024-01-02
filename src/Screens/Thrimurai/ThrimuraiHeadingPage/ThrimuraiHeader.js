import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../Context/ThemeContext';
// import { theme } from '../../../Helpers';
const ThrimuraiHeader = ({ selectedHeader, setSelectedheader, item }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <View>
            {selectedHeader.name == item.name ? (
                <TouchableOpacity
                    style={[
                        styles.selectedHeaderBox,
                        { backgroundColor: theme.iconHeadingColor.bgColor },
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
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.headerBox} onPress={() => setSelectedheader(item)}>
                    {item?.Icon}
                    <Text
                        style={[
                            styles.headerText,
                            {
                                color: theme.iconHeadingColor.inactiveTextColor,
                            },
                        ]}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
export const styles = StyleSheet.create({
    headerBox: {
        height: 70,
        width: Dimensions.get('window').width / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 12,
        fontFamily: 'Mulish-regular',
        fontWeight: '500',
    },
    selectedHeaderBox: {
        // padding: 15,
        height: 70,
        width: Dimensions.get('window').width / 4,

        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#72322E',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
});
export default ThrimuraiHeader;
