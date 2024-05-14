import React, { useContext, useState } from 'react';
import { FlatList, Platform, StatusBar, View } from 'react-native';
import TempleHeader from '../TempleHeader';
import HeadingComponent from '../Common/HeadingComponent';
import Background from '../../../components/Background';
import Temple1Svg from '../../../components/SVGs/Temple1Svg';
import { ThemeContext } from '../../../Context/ThemeContext';
import TripSvg from '../../../components/SVGs/TripSvg';
import EmptyTrip from './EmptyTrip';
import { useTranslation } from 'react-i18next';

const MyTrip = ({ navigation }) => {
    const [selectedHeader, setSelectedHeader] = useState('My trips');
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation()
    var header = [
        {
            name: 'My trips',
            selected: <TripSvg fill={theme?.headerComp?.selected} />,
            unSelected: <TripSvg fill={theme?.headerComp?.unSelected} />,
        },
        {
            name: 'Save Temple',
            selected: <Temple1Svg fill={theme?.headerComp?.selected} />,
            unSelected: <Temple1Svg fill={theme?.headerComp?.unSelected} />,
        },
    ];
    return (
        <View style={{ flex: 1 }}>
            <Background>
                <View
                    style={{ paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 30 : 0 }}
                >
                    <TempleHeader />
                </View>
                <FlatList
                    contentContainerStyle={{ marginVertical: 15, paddingHorizontal: 10 }}
                    horizontal
                    data={header}
                    renderItem={({ item, index }) => (
                        <HeadingComponent
                            item={t(`${item}`)}
                            index={index}
                            setHeader={setSelectedHeader}
                            selectedHeader={selectedHeader}
                        />
                    )}
                />
            </Background>
            <EmptyTrip navigation={navigation} />
        </View>
    );
};

export default MyTrip;
