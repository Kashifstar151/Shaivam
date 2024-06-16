import assetMapWithTempleType from './AssetMapWithTempleType';
const markerPressClbk = (navigation, flag, item, userLocation) => {
    console.log('🚀 ~ markerPressClbk ~ agrs:', flag, item);
    if (flag) {
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
            userLocation,
        });
    }
};

const categoryBtnClbk = (navigation, flag, regionCoordinate, userLocation) => {
    console.log('🚀 ~ categoryBtnClbk ~ flag:', flag);
    navigation.navigate('filteredTemples', {
        data: {
            flag,
            regionCoordinate,
            userLocation,
        },
    });
};

export { markerPressClbk, categoryBtnClbk };
