import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import WebView from "react-native-webview";
import BackButton from "../../components/BackButton";

const WebsiteView = ({ navigation, route }) => {
    const { params } = route
    const [loading, setLoading] = useState(false)

    // console.log("🚀 ~ WebsiteView ~ params:", params?.item?.attributes?.Calendar_url)
    return (
        <View style={{ flex: 1 }}>
            <BackButton navigation={navigation} />
            {
                params?.item?.attributes?.Calendar_url ?
                    <WebView startInLoadingState={loading} onLoadEnd={() => setLoading(false)} onLoadStart={() => setLoading(true)} source={{ uri: params?.item?.attributes?.Calendar_url }} style={{ flex: 1 }} >
                        {
                            loading &&
                            <ActivityIndicator
                                color='#bc2b78'
                                size="large"
                                hidesWhenStopped={true}
                            />
                        }

                    </WebView> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No Url available</Text>
                    </View>
            }
        </View>
    )
};

export default WebsiteView;
