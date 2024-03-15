import assetMapWithTempleType from './AssetMapWithTempleType';
const markerPressClbk = (navigation, flag) => {
    console.log('🚀 ~ markerPressClbk ~ agrs:', flag);
    navigation.navigate('filteredTemples', {
        data: assetMapWithTempleType[flag],
    });
};

const categoryBtnClbk = (navigation, ...args) => {
    console.log('🚀 ~ agrs:', args);
};

export { markerPressClbk, categoryBtnClbk };
