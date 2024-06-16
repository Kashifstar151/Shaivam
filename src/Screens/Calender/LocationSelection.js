import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { CustomButton } from '../../components/Buttons';
import ButtonComp from '../Temples/Common/ButtonComp';
import TrackBackToLocSVG from '../../components/SVGs/TrackBackToLocSVG';
import { getCurrentLocation, getTheLocationName } from '../../Helpers/GeolocationFunc';
import TextInputCom from '../Temples/Common/TextInputCom';
import { TextInput } from 'react-native-gesture-handler';
import SearchInput from '../../components/SearchInput';
import { colors } from '../../Helpers';
import { useDebouncer } from '../../Helpers/useDebouncer';
import { useGetListQuery } from '../../store/features/Calender/CalenderApiSlice';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationSelection = ({ calender, setSelected, close, selectedLocation }) => {
    // const [selectedEvent, setSelectedEvent] = useState(null)
    const { t } = useTranslation()
    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    });
    const [userLocation, setUserLocation] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });
    const dragCoor = useRef({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });
    const [userLocName, setUserLocName] = useState({
        name: '',
        displayName: '',
    });
    const [searchedText, setSearchText] = useState('');
    const [recentKeyword, setRecentKeywords] = useState([])
    const fetchTheName = useCallback(
        async (coors) => {
            // console.log('the location fetch enters  ');
            if (coors?.latitude && coors?.longitude) {
                // console.log('the location is fetching  ');
                const locationDetail = await getTheLocationName({ ...dragCoor.current });
                console.log('the location  fetching  is done', locationDetail);
                if (locationDetail.status === 'SUCCESS') {
                    setUserLocName((prev) => {
                        return {
                            ...prev,
                            name: locationDetail?.data?.address?.village || locationDetail?.name,
                            displayName: locationDetail?.data?.display_name,
                        };
                    });
                } else if (locationDetail.status === 'FAILED') {
                    alert('erorr occured');
                    console.log('The error is ==>', locationDetail?.err);
                }
            }
        },
        [dragCoor.current]
    );
    const [fetchLocationName, setFetchedLocationsName] = useState(null);
    const debounceVal = useDebouncer(searchedText, 500);
    const searchResultData = async () =>
        await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${debounceVal}&accept-language=en`,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            }
        ).then((res) => res.json());
    useEffect(() => {
        searchResultData().then((response) => {
            console.log(
                'the response for the search of the place name is ========================== ==>',
                response
            );
            setFetchedLocationsName((prev) => response)
        });
    }, [debounceVal]);
    useEffect(() => {
        getSearchedTexxs()
    }, [])
    const fetchMyLocation = async () => {
        // alert(true)
        getCurrentLocation(async (val) => {
            console.log("🚀 ~ getCurrentLocation ~ val:", val)
            const locationDetail = await getTheLocationName({ ...val });
            console.log("🚀 ~ getCurrentLocation ~ locationDetail:", locationDetail)
            // alert(true)
            // mapRef.current?.animateCamera({ center: val }, { duration: 1000 });
            setUserLocation((prev) => ({ ...prev, ...val }));
            setRegionCoordinate((prev) => ({ ...prev, ...val }));
            setSelected({ lat: locationDetail?.data?.lat, long: locationDetail?.data?.lon, name: locationDetail?.data?.display_name })
            close?.current?.close()
        });
    };
    const data = [
        { name: 'Jayanagar, Bangalore' },
        { name: 'Vijayanagar, Mysore' },
        { name: 'Location 3' },
        { name: 'Shimoga' },
        { name: 'Uzhavarappani' },
        { name: 'Location 5' },
    ];
    const selectionHandler = (item) => {
        console.log('🚀 ~ selectionHandler ~ item:', JSON.stringify(item, 0, 2));
        setSelected({ lat: item?.lat, long: item.lon, name: item?.name });
        close?.current?.close();
    };
    const setRecentSearches = () => {
        if (searchedText !== null && searchedText !== '') {
            const keys = recentKeyword ? recentKeyword : []
            const s = keys?.filter((keys) => keys !== searchedText)
            const updated = [...s, searchedText].slice(0, 6)
            AsyncStorage.setItem("recentLocationSearch", JSON.stringify(updated))
        }
    }
    const getSearchedTexxs = async () => {
        const data = await AsyncStorage.getItem('recentLocationSearch')
        console.log("🚀 ~ getSearchedTexxs ~ data:", data)
        setRecentKeywords(JSON.parse(data))
    }
    const renderRecentSearch = (item) => {
        console.log("🚀 ~ renderRecentSearch ~ item:", item)
        return (
            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#777777', width: 'auto', height: 35, borderRadius: 16, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} onPress={() => {
                setSearchText(item)
                // setTimeout(() => {
                //     getDataFromSql(item)
                // }, 1000)
                // getDataFromSql()
            }}>
                <Text style={{ fontSize: 12, fontFamily: 'Mulish-Regular' }}>{item}</Text>
            </TouchableOpacity>
        )
    }

    const rednerItem = (item, index) => (
        <TouchableOpacity
            style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}
            activeOpacity={0.5}
            onPress={() => selectionHandler(item)}
        >
            <Icon name="location-pin" size={16} color={'rgba(34, 34, 34, 1)'} />
            <Text
                style={{
                    color: 'rgba(34, 34, 34, 1)',
                    fontFamily: 'Mulish-Regular',
                    marginHorizontal: 20,
                }}
            >
                {item?.name}
            </Text>
        </TouchableOpacity>
    );
    return (
        <View style={{ paddingHorizontal: 0 }}>
            <Text style={styles.headingText}>{t('Search by location')}</Text>
            <View
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: '#F3F3F3',
                    height: 55,
                    width: Dimensions.get('window').width - 30,
                }}
            >
                <MaterialIcons name="search" size={28} color={colors.grey4} />
                <TextInput placeholder="Search for locations" placeholderTextColor={colors.grey5} onChangeText={(e) => setSearchText(e)} val={selectedLocation} onSubmitEditing={setRecentSearches} />
            </View>
            {/* <SearchInput color={true} styleOverwrite={{ marginHorizontalUnset: 20 }} /> */}
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ color: '#C1554E', fontSize: 16, fontFamily: 'Mulish-Bold' }}>
                    {t('Most searched locations')}
                </Text>
                <FlatList data={recentKeyword} contentContainerStyle={{ marginTop: 5 }} renderItem={({ item, index }) => renderRecentSearch(item)} horizontal />

                {/* <Text style={{ color: '#666666', fontFamily: 'Mulish-Regular', fontSize: 12 }}>
                    {t('Lorem ipsum dolor set')}
                </Text> */}
            </View>
            <FlatList contentContainerStyle={{ paddingHorizontal: 20 }} data={fetchLocationName} renderItem={({ item, index }) => (
                rednerItem(item, index)
            )} />
            <CustomButton
                svg={<TrackBackToLocSVG width={16} height={16} fill={'#C1554E'} />}
                onPress={() => {
                    if (calender) {
                        fetchMyLocation()
                        alert(true)
                        // alert(true)
                    } else {
                        // alert(true)
                        fetchMyLocation()
                        // dragCoor.current = { ...userLocation };
                        // fetchTheName(dragCoor.current);
                        // setRegionCoordinate((prev) => ({ ...prev, ...userLocation }));
                    }
                }}
                style={{
                    margin: 10,
                    elevation: 3,
                    shadowColor: 'black',
                    alignSelf: 'center',
                    borderRadius: 20,
                    borderColor: '#C1554E',
                    borderWidth: 1,
                }}
                text={t('Use my current location')}
                backgroundColor={'#ffffff'}
                textColor={'#C1554E'}
            />
            {/* </TouchableOpacity> */}
        </View>
    );
};
export const styles = StyleSheet.create({
    texIContContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
        width: 24,
        borderColor: 'rgba(119, 119, 119, 1)',
        borderWidth: 1,
    },
    headingText: {
        marginHorizontal: 20,
        fontFamily: 'Lora-Bold',
        color: 'rgba(34, 34, 34, 1)',
        marginVertical: 15,
        fontSize: 16,
    },
});

export default LocationSelection;
