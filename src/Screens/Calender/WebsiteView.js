import React from "react";
import { Dimensions, View } from "react-native";
import WebView from "react-native-webview";
import BackButton from "../../components/BackButton";

const WebsiteView = ({ navigation, route }) => {
    const { params } = route
    console.log("🚀 ~ WebsiteView ~ params:", params?.item?.attributes?.Calendar_url)
    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={navigation} />
            <WebView source={{ uri: params?.item?.attributes?.Calendar_url }} style={{ flex: 1, backgroundColor: 'red', }} />
        </View>
    )
};

export default WebsiteView;
