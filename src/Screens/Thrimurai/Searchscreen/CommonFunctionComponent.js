import { Dimensions, Pressable, View, Text } from 'react-native';
import HighlightedText from './HighlightedText';

const highlight = (item, index, key, debounceVal) => {
    const textContent = key === 'title' ? item?.title : item?.rawSong;
    // console.log('searchText =====>', debounceVal);
    return (
        <View
            style={{
                flexDirection: 'row',
                maxWidth: Dimensions.get('window').width - 30,
                flexWrap: 'wrap',
            }}
        >
            <HighlightedText text={textContent} highlight={debounceVal} />
        </View>
    );
};

function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

const renderThirumuraiId = (id) => {
    if (id < 9) {
        return id;
    } else if (id == 9) {
        return '8K';
    } else if (id == 10 || id == 11) {
        return 9;
    } else if (id == 12) {
        return 10;
    } else if (id == 13) {
        return 11;
    } else {
        return 12;
    }
};

const renderResult = (item, index, key, debounceVal, onPressClbk) => {
    return (
        <Pressable style={{ marginVertical: 10 }} onPress={() => onPressClbk()}>
            {key == 'title' ? null : (
                <Text>
                    {`${renderThirumuraiId(item?.thirumuraiId)}.${minTwoDigits(
                        item?.titleNo
                    )}.${minTwoDigits(item?.songNo)}`}
                </Text>
            )}
            {highlight(item, index, key, debounceVal)}
        </Pressable>
    );
};

export { renderResult };
