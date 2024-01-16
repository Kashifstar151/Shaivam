import React from 'react';
import { View } from 'react-native';

const ElevatedCard = ({ children, theme }) => {
    return (
        <View
            style={{
                elevation: theme?.colorscheme === 'light' ? 10 : 0,
                shadowColor: '#a0a0a0',
                marginHorizontal: 15,
                marginBottom: 5,
                backgroundColor: theme?.colorscheme === 'light' ? '#fff' : '#333333',
                overflow: 'visible',
                borderRadius: 15,
            }}
        >
            {children}
        </View>
    );
};

export default ElevatedCard;
