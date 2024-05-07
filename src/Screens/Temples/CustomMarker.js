import { Image, Text, View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import assetMapWithTempleType from './AssetMapWithTempleType';
export const MarkerCallOut = ({ callback, flag, coordinate, description }) => {
    return (
        <Marker
            tracksViewChanges={false}
            coordinate={coordinate}
            description={'This is a marker in React Natve'}
            // image={assetMapWithTempleType[1].path}
            style={{
                width: '100%',
                alignItems: 'center',
            }}
        >
            <View>{assetMapWithTempleType[flag]?.Svg}</View>
            <Callout
                tooltip={true}
                onPress={callback ? callback : null}
                style={{ alignItems: 'center' }}
            >
                <View
                    style={{
                        backgroundColor: 'black',
                        borderRadius: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                        }}
                    >
                        {description ? description : 'Sorry no data available'}
                    </Text>
                </View>
                <View
                    style={{
                        borderTopWidth: 10,
                        width: 20,
                        height: 10,
                        borderLeftWidth: 10,
                        borderRightWidth: 10,
                        borderRightColor: 'transparent',
                        borderLeftColor: 'transparent',
                        borderTopColor: 'black',
                    }}
                ></View>
            </Callout>
        </Marker>
    );
};

export const DraggableMarker = ({ callback, flag, coordinate, keyName, children }) => {
    return (
        <Marker
            draggable
            tracksViewChanges={false}
            coordinate={coordinate}
            description={'This is a marker in React Natve'}
            onDragEnd={(e) => {
                e.persist();
                callback(e.nativeEvent.coordinate);
            }}
        >
            <Image
                source={assetMapWithTempleType[1].path}
                resizeMode="contain"
                key={`${keyName}-${flag}`}
            />
            <Callout>
                <Text
                    style={{
                        width: 200,
                        color: 'white',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor: 'black',
                    }}
                >
                    This is the your starting location
                </Text>
            </Callout>
        </Marker>
    );
};

export const CustomMarker = ({ setPadState, callback, flag, coordinate, keyName, children }) => {
    return (
        <Marker
            tracksViewChanges={false}
            coordinate={coordinate}
            description={'This is a marker in React Natve'}
            onPress={callback ? callback : null}
            // image={assetMapWithTempleType[1].path}
        >
            {assetMapWithTempleType[flag]?.Svg}
            {/* <Image
                onLoadEnd={() => {
                    setTimeout(() => {
                        setPadState((prev) => !prev);
                    }, 1000);
                }}
                source={assetMapWithTempleType[flag].path}
                resizeMode="contain"
                key={`${keyName}-${flag}`}
            />
            {children} */}
        </Marker>
    );
};
