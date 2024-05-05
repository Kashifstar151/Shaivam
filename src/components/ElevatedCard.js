import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';

const ElevatedCard = ({ children, theme, navigation }) => {
    return (
        <Pressable
            onPress={navigation}
            style={{

                elevation: theme?.colorscheme === 'light' ? 10 : 0,
                shadowColor: '#a0a0a0',
                marginHorizontal: 15,
                marginBottom: 5,
                // backgroundColor: theme?.colorscheme === 'light' ? '#fff' : '#333333',
                backgroundColor: 'red',
                // overflow: 'visible',
                borderRadius: 15,
            }}
        >
            {children}
        </Pressable>
    );
};

export default ElevatedCard;
