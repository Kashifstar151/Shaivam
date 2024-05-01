import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';

async function buildLink(item) {
    const link = await dynamicLinks().buildShortLink(
        {
            link: `https://shaivaam.page.link/org?prevId=${item?.prevId}`,
            domainUriPrefix: 'https://shaivaam.page.link',
            ios: {
                appStoreId: '123456',
                bundleId: 'com.Shaivam.shaivam',
                minimumVersion: '18',
            },
            android: {
                packageName: 'org.shaivam',
            },
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
        },
        dynamicLinks.ShortLinkType.DEFAULT
    );
    return link;
}

export const shareSong = async (item) => {
    const link = await buildLink(item);
    Share.open({
        message: `${item?.title} I want to share this Thirumurai with you.
        இந்தத் திருமுறையை Shaivam.org Mobile செயலியில் படித்தேன். மிகவும் பிடித்திருந்தது. பகிர்கின்றேன். படித்து மகிழவும் ${link}`,
    });
};
