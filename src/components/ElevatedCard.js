import React from 'react';
import { View } from 'react-native';

const ElevatedCard = ({ children }) => {
    return (
        <View
            style={{
                elevation: 10,
                shadowColor: '#a0a0a0',
                marginHorizontal: 15,
                marginBottom: 5,
            }}
        >
            {children}
        </View>
    );
};

export default ElevatedCard;
