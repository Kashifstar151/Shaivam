import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { RouteTexts } from '../../navigation/RouteText';

const ExitTemple = ({ navigation }) => {
    // const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.replace(RouteTexts.BOTTOM_TABS, {
                screen: 'Home'
            }); // Navigate to SecondaryTabs
            return () => unsubscribe;
        }, [navigation])
    );

    return null;

}

export default ExitTemple