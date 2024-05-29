import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import templeMetaData from './AssetMapWithTempleType';
import { categoryBtnClbk } from './CallBacksForClick';
import { useTranslation } from 'react-i18next';
console.log('🚀 ~ templeMetaData:', templeMetaData);

const InnerContextOfAnimatedSideBox = ({ navigation, regionCoordinate }) => {
    const { t } = useTranslation();
    return (
        <View style={{}}>
            {Object?.entries(templeMetaData)
                .reverse()
                .map(([key, value], indx) => {
                    if (key !== '8' && key !== '9') {
                        return (
                            <Pressable
                                onPress={() => {
                                    // adding callback on the category btn press and navigating to the filter page
                                    // alert(key)
                                    categoryBtnClbk(navigation, key, regionCoordinate);
                                }}
                                style={{ gap: 2, paddingBottom: 10 }}
                                key={indx}
                            >
                                <View
                                    style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
                                >
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
                                        {t(`${value.fullName}`)}
                                    </Text>
                                </View>
                                {/* <Text style={{ color: '#222222', fontSize: 10 }}>{value.content}</Text> */}
                            </Pressable>
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
