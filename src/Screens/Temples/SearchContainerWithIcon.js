import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SearchTemple from './SearchTemple';

const SearchContainerWithIcon = ({ children }) => {
    return (
        <View style={styles.mainContainer}>
            {children}
            <View style={{ paddingVertical: 4 }}>
                <Image
                    source={{
                        uri: 'https://shaivam.org/assests/icons/logo.png',
                    }}
                    style={styles.imageDimension}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        // height: 45
    },
    imageDimension: { height: 40, width: 40 },
});

export default SearchContainerWithIcon;
