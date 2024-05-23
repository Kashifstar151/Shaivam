import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const AboutUs = () => {
    const { t } = useTranslation()
    const contents = [
        { id: 1, title: t('') }
    ]
    return (
        <View style={{ backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ color: '#222222', fontFamily: 'Lora-SemiBold', fontSize: 16 }}>{t('About app')}</Text>
            <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12, color: '#777777' }}>{t('Lorem ipsum dolor set lorem ipsum')}</Text>
            <View>
                <Text>{t(`App Version 3.3
                    Find the Shiva Temples around you, across the world.
                    Read and Listen to Thirumurai Simultaneously.
                    A handy    calender of festivals and shaivate events.
                    Two 24X7 Radio services - Tamil and   Multilingual.
                    Prayer Remainder for daily Anushtanam.
                    Search and get anything in Shaivam.org through this App.       You can use the App in English or Tamil (See Settings).Name of Hara Encompass; World be free from suffering is our motto.If you like the service provided,
                    Contribute events, temple information through the App or    Shaivam.org
                    If you are a Shaivate scholar,contribute lectures, songs, articles, atr etc. to Shaivam.org and radio.
                    Share about this App with your friends and through social media.
                    Rate this in the AppStore This App is our offering in Your spiritual journey.`)}</Text>
            </View>
        </View>
    );
};
export default AboutUs;
