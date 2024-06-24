// filter page on the temple category
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import TempleCard from './TempleCard';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheetTempleTemplate from './BottomSheetTempleTemplate';
import templeData from './AssetMapWithTempleType';
import {
    useGetNearByTemplesQuery,
    useLazyGetNearByTemplesQuery,
} from '../../store/features/Temple/TemplApiSlice';
import { RFValue } from 'react-native-responsive-fontsize';
import getDimension from '../../Helpers/getDimension';
import { markerPressClbk } from './CallBacksForClick';
import { ThemeContext } from '../../Context/ThemeContext';

const snapPointsArray = ['10%', '50%', '95%'];
const snapMap = {
    0: 0.1,
    1: 0.5,
    2: 0.95,
};
const FilteredTemplesPage = ({ navigation, route }) => {
    const { data, isSuccess, isLoading, isFetching, isError, error } = useGetNearByTemplesQuery(
        {
            flag: route?.params?.data?.flag,
            ...route?.params?.data?.regionCoordinate,
            limit: 100,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    // const [getNearByTemples, { data, isSuccess, isLoading, isFetching, isError, error }] =
    //     useLazyGetNearByTemplesQuery();

    // useEffect(() => {
    //     try {
    //         getNearByTemples({
    //             flag: route?.params?.data?.flag,
    //             ...route?.params?.data?.regionCoordinate,
    //             limit: 100,
    //         });
    //     } catch (err) {
    //         console.log('the error is -==-=-=-=-=-=-=-=--=-==--==--==-=-=--==--=-===-==->', err);
    //     }
    // }, [route?.params?.data]);

    const [snapIndex, setSnapIndex] = useState(0);
    // const { screenHeight } = getDimension();
    const { screenHeight, screenWidth } = getDimension();
    const LATITUDE_DELTA = 0.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (screenWidth / screenHeight);
    const { theme } = useContext(ThemeContext);
    return (
        <BottomSheetTempleTemplate
            navigation={navigation}
            snapIndex={snapIndex}
            setSnapIndex={setSnapIndex}
            snapPoints={snapPointsArray}
            showSearchBarWhenFullSize={true}
            regionCoordinate={{
                ...route?.params?.data?.regionCoordinate,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                locationName: '',
            }}
            userLocation={{
                ...route?.params?.data?.userLocation,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
            initialIndexOfSize={1}
            disappearsOnIndex={1}
            appearsOnIndex={2}
            isNavigable={false}
            routeName={route?.name}
            data={data?.temples}
            valueToBePreFilled={templeData[route?.params?.data?.flag]?.name}
            isSearchFieldDisabled={true}
            isSearchFieldDisabledInFullScreenMode={true}
        >
            {!(isLoading || isFetching) ? (
                data?.temples.length ? (
                    <ScrollView
                        // nestedScrollEnabled
                        style={{
                            backgroundColor: theme.colorscheme === 'light' ? '#fff' : '#333333',
                        }}
                    >
                        {data?.temples.map((item, index) => (
                            <TempleCard
                                key={index}
                                dataSet={{
                                    ...item,
                                    templeName: item.name,
                                }}
                                regionCoordinate={route?.params?.data?.regionCoordinate}
                                showButton={true}
                                showMargin={true}
                                onTitleClick={() => {
                                    markerPressClbk(navigation, item?.flag, item, {
                                        ...route?.params?.data?.userLocation,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LONGITUDE_DELTA,
                                    });
                                }}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <View
                        style={{
                            alignItems: 'center',
                            height: snapIndex !== 0 ? screenHeight * snapMap[snapIndex] : 'auto',
                            justifyContent: 'center',
                            backgroundColor: theme.colorscheme === 'light' ? '#fff' : '#333333',
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
                                color: theme.colorscheme === 'light' ? '#000' : '#fff',
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
                        paddingVertical: 20,
                        backgroundColor: theme.colorscheme === 'light' ? '#fff' : '#333333',
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            color: theme.colorscheme === 'light' ? '#000' : '#fff',
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
