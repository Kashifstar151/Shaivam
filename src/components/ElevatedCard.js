import React from 'react';
import { View } from 'react-native';

const ElevatedCard = ({ children, theme }) => {
    console.log('🚀 ~ file: ElevatedCard.js:5 ~ ElevatedCard ~ theme:', theme);
    return (
        <View
            style={{
                elevation: 10,
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
