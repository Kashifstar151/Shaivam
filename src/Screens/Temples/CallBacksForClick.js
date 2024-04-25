import assetMapWithTempleType from './AssetMapWithTempleType';
const markerPressClbk = (navigation, flag, item) => {
    console.log('🚀 ~ markerPressClbk ~ agrs:', flag);
    navigation.navigate('templeDetails', {
        data: item ? item : assetMapWithTempleType[flag],
    });
};

const categoryBtnClbk = (navigation, flag) => {
    navigation.navigate('filteredTemples', {
        data: assetMapWithTempleType[flag],
    });
};

export { markerPressClbk, categoryBtnClbk };
