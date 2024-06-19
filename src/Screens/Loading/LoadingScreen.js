import React from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Dimensions, Platform, StatusBar, View } from "react-native";

const LoadingScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <SkeletonPlaceholder borderRadius={4} >
                <SkeletonPlaceholder.Item style={{ marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 20 : 20, paddingHorizontal: 20, height: Dimensions.get('window').height }}>
                    <SkeletonPlaceholder.Item flexDirection="row" justifyContent='space-between' >
                        <SkeletonPlaceholder.Item width={150} height={40} borderRadius={10} />
                        <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item width={'100%'} height={40} borderRadius={10} style={{ marginVertical: 10 }} />
                    <SkeletonPlaceholder.Item style={{ flexDirection: 'row' }}>
                        <SkeletonPlaceholder.Item width={'31%'} height={40} borderRadius={10} style={{ marginVertical: 10, }} />
                        <SkeletonPlaceholder.Item width={'31%'} height={40} borderRadius={10} style={{ marginVertical: 10, marginHorizontal: 10 }} />
                        <SkeletonPlaceholder.Item width={'31%'} height={40} borderRadius={10} style={{ marginVertical: 10 }} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item width={'31%'} height={30} borderRadius={10} style={{ marginVertical: 20, }} />
                    <SkeletonPlaceholder.Item style={{ flexDirection: 'row' }}>
                        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={10} style={{ marginVertical: 10, }} />
                        <SkeletonPlaceholder.Item width={'80%'} height={50} borderRadius={10} style={{ marginVertical: 10, marginHorizontal: 20 }} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item style={{ flexDirection: 'row' }}>
                        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={10} style={{ marginVertical: 10, }} />
                        <SkeletonPlaceholder.Item width={'80%'} height={50} borderRadius={10} style={{ marginVertical: 10, marginHorizontal: 20 }} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item style={{ flexDirection: 'row' }}>
                        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={10} style={{ marginVertical: 10, }} />
                        <SkeletonPlaceholder.Item width={'80%'} height={50} borderRadius={10} style={{ marginVertical: 10, marginHorizontal: 20 }} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item style={{ flexDirection: 'row' }}>
                        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={10} style={{ marginVertical: 10, }} />
                        <SkeletonPlaceholder.Item width={'80%'} height={50} borderRadius={10} style={{ marginVertical: 10, marginHorizontal: 20 }} />
                    </SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item style={{ flexDirection: 'row' }}>
                        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={10} style={{ marginVertical: 10, }} />
                        <SkeletonPlaceholder.Item width={'80%'} height={50} borderRadius={10} style={{ marginVertical: 10, marginHorizontal: 20 }} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
};

export default LoadingScreen;
