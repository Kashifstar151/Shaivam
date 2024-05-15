// filter page on the temple category
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import TempleCard from './TempleCard';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheetTempleTemplate from './BottomSheetTempleTemplate';
import templeData from './AssetMapWithTempleType';
import { useGetNearByTemplesQuery } from '../../store/features/Temple/TemplApiSlice';
import { RFValue } from 'react-native-responsive-fontsize';
import getDimension from '../../Helpers/getDimension';

const snapPointsArray = ['10%', '50%', '95%'];
const snapMap = {
    0: 0.1,
    1: 0.5,
    2: 0.95,
};
const FilteredTemplesPage = ({ navigation, route }) => {
    const { data, isSuccess, isLoading, isFetching, isError, error } = useGetNearByTemplesQuery({
        flag: route?.params?.data?.flag,
        ...route?.params?.data?.regionCoordinate,
    });
    const [snapIndex, setSnapIndex] = useState(0);
    const { screenHeight } = getDimension();

    return (
        <BottomSheetTempleTemplate
            snapIndex={snapIndex}
            setSnapIndex={setSnapIndex}
            snapPoints={snapPointsArray}
            showSearchBarWhenFullSize={true}
            regionCoordinate={{
                latitude: 11.2002937,
                longitude: 79.6203017,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                locationName: '',
            }}
            initialIndexOfSize={1}
            disappearsOnIndex={1}
            appearsOnIndex={2}
            isNavigable={false}
            routeName={route?.name}
            data={templeData[route?.params?.data?.flag]}
            valueToBePreFilled={templeData[route?.params?.data?.flag]?.name}
            isSearchFieldDisabled={true}
            isSearchFieldDisabledInFullScreenMode={true}
        >
            {!(isLoading || isFetching) ? (
                data?.temples.length ? (
                    <ScrollView
                    // nestedScrollEnabled
                    >
                        {data?.temples.map((item, index) => (
                            <TempleCard
                                dataSet={{
                                    ...item,
                                    templeName: item.name,
                                }}
                                regionCoordinate={route?.params?.data?.regionCoordinate}
                                showButton={true}
                                showMargin={true}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <View
                        style={{
                            alignItems: 'center',
                            height: snapIndex !== 0 ? screenHeight * snapMap[snapIndex] : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {snapIndex !== 0 && (
                            <Image
                                source={require('../../../assets/Images/no-data.png')}
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        )}
                        <Text
                            style={{
                                color: '#000',
                                textAlign: 'center',
                                fontFamily: 'Mulish-Bold',
                                fontSize: RFValue(16, 850),
                                paddingTop: 10,
                            }}
                        >
                            No data available
                        </Text>
                    </View>
                )
            ) : (
                <View
                    style={{
                        marginVertical: 20,
                    }}
                >
                    <Text
                        style={{
                            color: '#000',
                            paddingHorizontal: 20,
                            fontFamily: 'Mulish-Bold',
                            fontSize: RFValue(16, 850),
                        }}
                    >
                        Loading...
                    </Text>
                </View>
            )}
        </BottomSheetTempleTemplate>
    );
};

export default FilteredTemplesPage;
