import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const TempleSelection = () => {
    return (
        <View style={{}}>
            <MapView
                style={{ height: 500, width: 400 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};

export default TempleSelection;
