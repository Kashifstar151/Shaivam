import assetMapWithTempleType from './AssetMapWithTempleType';
const markerPressClbk = (navigation, flag, item) => {
    console.log('🚀 ~ markerPressClbk ~ agrs:', flag, item);
    navigation.navigate('templeDetails', {
        temple: {
            // metaDate: item ? item : assetMapWithTempleType[item?.flag],
            templeFlag: item?.flag,
            templeName: item?.name,
            templeId: item?.id,
            templeCoordinate: {
                longitude: parseFloat(item?.longitude),
                latitude: parseFloat(item?.latitude),
            },
        },
    });
};

const categoryBtnClbk = (navigation, flag) => {
    navigation.navigate('filteredTemples', {
        data: assetMapWithTempleType[flag],
    });
};

export { markerPressClbk, categoryBtnClbk };
