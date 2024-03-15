import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import assetMapWithTempleType from './AssetMapWithTempleType';

export const CustomMarker = ({ setPadState, callback, flag, coordinate }) => {
    return (
        <Marker
            tracksViewChanges={false}
            coordinate={coordinate}
            description={'This is a marker in React Natve'}
            onPress={callback}
            // image={assetMapWithTempleType[1].path}
        >
            <Image
                onLoad={() => {
                    setPadState((prev) => !prev);
                }}
                source={assetMapWithTempleType[flag].path}
                resizeMode="contain"
            />
        </Marker>
    );
};
