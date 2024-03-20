import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { RouteTexts } from "../../navigation/RouteText";

const TempleTabsNavigate = ({ navigation }) => {
    //   return (
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.navigate(RouteTexts.TEMPLE_Tabs, {
                screen: 'Temples',
            }); // Navigate to SecondaryTabs
            return () => unsubscribe;
        }, [navigation])
    )

    return null;
    //   );
};

export default TempleTabsNavigate;
