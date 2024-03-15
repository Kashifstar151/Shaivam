import React, { useContext, useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    UIManager,
    Platform,
    LayoutAnimation,
    StatusBar,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Background from '../../components/Background';
import HeadingText from '../../components/HeadingText';
import SearchInput from '../../components/SearchInput';
import HeadingComponent from '../Temples/Common/HeadingComponent';
import InActiveCalender from '../../assets/Images/UnactiveCalender.svg';
import ActiveStar from '../../assets/Images/ActiveStar.svg';
import InActiveStar from '../../assets/Images/UnactiveStart.svg';
import ActiveCalender from '../../assets/Images/CalenderAct.svg';
import { Calendar, LocaleConfig, WeekCalendar, ExpandableCalendar } from 'react-native-calendars';
import CustomCalender from './CustomCalender';
import { colors } from '../../Helpers';
import ElevatedCard from '../../components/ElevatedCard';
import EventCard from '../../components/EventCard';
import { ThemeContext } from '../../Context/ThemeContext';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Calender = () => {
    const data = [
        { name: 'Festivals', selected: <ActiveStar />, unSelected: <InActiveStar /> },
        { name: 'Events', selected: <ActiveCalender />, unSelected: <InActiveCalender /> },
    ];
    const [isExpanded, setIsExpanded] = useState(false);
    const { theme } = useContext(ThemeContext);
    const eventData = [
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
        {
            date: { day: 'THU', dateNo: '06' },
            title: 'முதல்-திருமுறை - Pradhosham',
            timing: '8:00pm - 11:00pm',
        },
    ];
    const [selectedHeader, setSelectedheader] = useState();
    const [fullScreen, setFullScreen] = useState(true);
    const [selected, setSelected] = useState('2024-03-13');
    const marked = useMemo(
        () => ({
            [selected]: {
                marked: true,
                dotColor: 'black',
                customStyles: {
                    container: {
                        backgroundColor: '#FCB300',
                        height: 40,
                        borderRadius: 5,
                    },
                    text: {
                        color: 'black',
                        fontFamily: 'Mulish-Bold',
                    },
                },
            },
        }),
        [selected]
    );
    const RenderItem = () => (
        <View style={[styles.shadowProps, styles.itemContainer]}>
            <View style={styles.itemDateContainer}>
                <Text style={styles.itemText}>THU</Text>
                <Text style={styles.itemDateText}>06</Text>
            </View>
        </View>
    );
    return (
        <View nestedScrollEnabled style={{ backgroundColor: '#fff', flex: 1 }}>
            {/* <View style={{ backgroundColor: 'red' }}> */}
            <Background>
                <View>
                    <View style={styles.HeadeingContainer}>
                        <HeadingText text={'Calenders'} nandiLogo={true} />
                    </View>
                    <View style={styles.SearchInputContainer}>
                        <View style={{ width: '84%' }}>
                            <SearchInput placeholder={'Search for Festivals/events'} />
                        </View>
                        <TouchableOpacity style={styles.AddBtnContainer}>
                            <Icon name="plus" size={28} color="#222222" />
                        </TouchableOpacity>
                    </View>

                    {/* <FlatList
                        contentContainerStyle={{ paddingHorizontal: 15, marginVertical: 10 }}
                        horizontal
                        data={data}
                        renderItem={({ item, index }) => (
                            <HeadingComponent
                                selectedHeader={selectedHeader}
                                setHeader={setSelectedheader}
                                item={item}
                                index={index}
                            />
                        )}
                    /> */}
                </View>
                <View style={{ height: 100 }}></View>
            </Background>
            <View
                style={{
                    marginTop: -100,
                    width: Dimensions.get('screen').width,
                    flex: 1,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 10,
                        alignSelf: 'center',
                    }}
                >
                    {fullScreen ? (
                        <View style={[styles.calenderContainer, styles.shadowProps]}>
                            <Calendar
                                theme={{
                                    arrowStyle: { backgroundColor: '#EDEDED', borderRadius: 20 },
                                    arrowColor: '#777777',
                                    // calendarBackground: '#222',
                                    dayTextColor: '#222222',
                                    textDayFontFamily: 'Mulish-Bold',
                                    textDisabledColor: 'grey',
                                    monthTextColor: '#222222',
                                    textDayFontWeight: '600',
                                    textMonthFontWeight: '600',
                                }}
                                onDayPress={(day) => setSelected(day?.dateString)}
                                markingType="custom"
                                markedDates={marked}
                                style={styles.calenderTheme}
                            />
                            <TouchableOpacity
                                style={{ alignSelf: 'center' }}
                                onPress={() => setFullScreen(false)}
                            >
                                <Icon name="chevron-up" size={23} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ overflow: 'scroll' }}>
                            <CustomCalender setFullScreen={setFullScreen} />
                        </View>
                    )}
                </View>

                <View style={{ paddingHorizontal: 20, marginVertical: 15, backgroundColor: 'red' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Lora-Bold' }}>
                        Today, Oct 06, 2023
                    </Text>
                </View>
                <FlatList
                    data={eventData}
                    renderItem={({ item, index }) => (
                        <ElevatedCard theme={{ colorscheme: theme.colorscheme }}>
                            <EventCard
                                date={item.date}
                                timing={item.timing}
                                title={item.title}
                                theme={{
                                    textColor: theme.textColor,
                                    colorscheme: theme.colorscheme,
                                }}
                            />
                        </ElevatedCard>
                    )}
                />
            </View>
            {/* </View> */}
        </View>
    );
};
export const styles = StyleSheet.create({
    HeadeingContainer: { paddingHorizontal: 15, justifyContent: 'center', marginVertical: 15 },
    SearchInputContainer: { flexDirection: 'row' },
    AddBtnContainer: {
        backgroundColor: '#FCB300',
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Calender;
