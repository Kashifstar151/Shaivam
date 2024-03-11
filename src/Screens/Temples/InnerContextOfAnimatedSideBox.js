import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import templeMetaData from './AssetMapWithTempleType';

const InnerContextOfAnimatedSideBox = () => {
    return (
        <View style={{}}>
            {Object.entries(templeMetaData).map(([key, value], indx) => {
                if (key !== '8') {
                    return (
                        <View style={{ gap: 2, paddingBottom: 10 }}>
                            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                                <View
                                    style={[
                                        styles.textContWrapper,
                                        {
                                            backgroundColor: value.metaData.color,
                                        },
                                    ]}
                                >
                                    {value.metaData.letterAssociated && (
                                        <Text style={styles.textStyleForCont}>
                                            {value.metaData.letterAssociated}
                                        </Text>
                                    )}
                                </View>
                                <Text style={{ color: '#000', fontWeight: 600, fontSize: 12 }}>
                                    {value.fullName}
                                </Text>
                            </View>
                            <Text style={{ color: '#222222', fontSize: 10 }}>{value.content}</Text>
                        </View>
                    );
                } else {
                    return null;
                }
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    textContWrapper: {
        height: 14,
        width: 14,
        borderRadius: 2,
        justifyContent: 'center',
    },
    textStyleForCont: {
        alignSelf: 'center',
        paddingVertical: 'auto',
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 15,
        fontSize: 10,
    },
});
export default InnerContextOfAnimatedSideBox;
