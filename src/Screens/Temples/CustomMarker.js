import { Image, Text, View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import assetMapWithTempleType from './AssetMapWithTempleType';
export const MarkerCallOut = ({ setPadState, callback, flag, coordinate, keyName, children }) => {
    return (
        <Marker
            tracksViewChanges={false}
            coordinate={coordinate}
            description={'This is a marker in React Natve'}
            onPress={callback ? callback : null}
        // image={assetMapWithTempleType[1].path}
        >
            <Image
                onLoadEnd={() => {
                    setTimeout(() => {
                        setPadState((prev) => !prev);
                    }, 1000);
                }}
                source={assetMapWithTempleType[flag].path}
                resizeMode="contain"
                key={`${keyName}-${flag}`}
            />
            <Callout>
                <Text style={{ color: 'red', backgroundColor: 'black' }}>Suck my dickk </Text>
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
