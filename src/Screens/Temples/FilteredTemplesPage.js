// filter page on the temple category
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SearchTemple from './SearchTemple';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { ImageBackground } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import FileUplaoder from './FileUplaoder';
import SpottingErrorPage from './SuccuessPages/SpottingErrorPage';
import TempleCard from './TempleCard';
import { templesDetailsArray } from './AssetMapWithTempleType';
import { ScrollView } from 'react-native-gesture-handler';

const FilteredTemplesPage = ({ navigation, route }) => {
    console.log('🚀 ~ TempleDetails ~ route:', route.params?.data?.name);
    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    });
    const bottomSheetRef = useRef(null);
    const [snapIndex, setSnapIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(true)

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        setSnapIndex(index);
    }, []);

    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1, marginTop: Platform.OS == 'ios' ? 15 : 0 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={null}
                style={styles.map}
                region={regionCoordinate}
            ></MapView>
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    padding: 20,

                }}
            >
                <SearchContainerWithIcon>
                    <SearchTemple
                        route={route.name}
                        value={route.params?.data?.name ?? route.params?.searchText}
                        isNavigable={false}
                    />
                </SearchContainerWithIcon>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={['10%', '50%', '95%']}
                index={1}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        opacity={1}
                        appearsOnIndex={2}
                        disappearsOnIndex={1}
                        pressBehavior={'collapse'}
                        {...props}
                    >
                        <ImageBackground
                            source={
                                theme.colorscheme === 'light'
                                    ? require('../../../assets/Images/Background.png')
                                    : require('../../../assets/Images/BackgroundCommon.png')
                            }
                            style={{
                                paddingVertical: 0,
                                borderRadius: 10,
                                width: '100%',
                                height: '40%',
                            }}
                        ></ImageBackground>
                    </BottomSheetBackdrop>
                )}
            >
                {/* <Text style={{ color: 'black' }}>dhshdjksk</Text> */}
                {/* {
                    modalVisible &&
                    <Modal transparent> */}
                {/* <FileUplaoder setModalVisible={setModalVisible} /> */}
                {/* <SpottingErrorPage setModalVisible={setModalVisible} navigation={nav}/>
                    </Modal>
                } */}
                {snapIndex === 2 ? (
                    <View
                        style={{
                            width: '100%',
                            padding: 20,
                        }}
                    >
                        <SearchContainerWithIcon>
                            <SearchTemple
                                route={route.name}
                                value={route.params?.data?.name ?? route.params?.searchText}
                                isNavigable={false}
                            />
                        </SearchContainerWithIcon>
                    </View>
                ) : null}
                <ScrollView nestedScrollEnabled>
                    {templesDetailsArray.map((item, index) => (
                        <TempleCard dataSet={item} showButton={true} showMargin={true} />
                    ))}
                </ScrollView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
});

export default FilteredTemplesPage;
