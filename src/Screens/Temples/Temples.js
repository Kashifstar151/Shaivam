import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { RouteTexts } from '../../navigation/RouteText';

export const Temples = () => {
    // const MorePlaceholderScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigate()
    }, [navigation])
    const navigate =
        React.useCallback(() => {
            const unsubscribe = navigation.navigate(RouteTexts.TEMPLE_Tabs); // Navigate to SecondaryTabs
            return () => unsubscribe;
        }, [navigation])


    // useEffect(
    //     React.useCallback(() => {
    //         const unsubscribe = navigation.navigate(RouteTexts.TEMPLE_Tabs); // Navigate to SecondaryTabs
    //         return () => unsubscribe;
    //     }, [navigation])
    // );

    return null; // This screen doesn't need to render anything
    //   };
    // return (
    //     <View>

    //     </View>
    // )
}

export default Temples