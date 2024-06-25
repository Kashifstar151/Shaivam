import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'moment/min/locales';
import moment from 'moment';
import { ar, as, bn, en, gu, he, hi, ja, kn, ml, od, si, ta, te, ur, pa, hd } from './translations';

const map = {
    'en-IN': en,
    'kn-IN': kn,
    DV: hi,
};

export const AVAILABLE_LANGUAGES = {
    // en: {
    //     translation: en,
    // },
    hi: {
        translation: hi,
    },
    // kn: {
    //     translation: kn,
    // },
    'en-IN': {
        translation: map['en-IN'],
    },
    'kn-IN': {
        translation: map['kn-IN'],
    },
    DV: {
        translation: map['DV'],
    },
    bn: {
        translation: bn,
    },
    ar: {
        translation: ar,
    },
    as: {
        translation: as,
    },
    gu: {
        translation: gu,
    },
    he: {
        translation: he,
    },
    ja: {
        translation: ja,
    },
    ml: {
        translation: ml,
    },
    od: {
        translation: od,
    },
    pa: {
        translation: pa,
    },
    si: {
        translation: si,
    },
    en: {
        translation: ta,
    },
    te: {
        translation: te,
    },
    ur: {
        translation: ur,
    },
    // adding hindi dev naagri
    hd: {
        translation: hd,
    },
};
// const STORE_LANGUAGE_KEY = 'settings.lang';

// const languageDetector = {
//     type: 'languageDetector',
//     async: true,
//     init: () => {},

//     detect: function (callback) {
//         try {
//             //get stored language from Async storage
//             AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
//                 if (language) {
//                     //if language was stored before, use this language in the app
//                     callback(language);
//                 } else {
//                     //if language was not stored yet, use device's locale
//                     callback(RNLocalize.getLocales().map((locale) => locale.languageCode)[0]);
//                 }
//             });
//         } catch (error) {
//             console.log('Error reading language', error);
//         }
//     },
//     cacheUserLanguage: (lng) => AsyncStorage.setItem(STORE_LANGUAGE_KEY, lng),
// };

i18n
    // .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: AVAILABLE_LANGUAGES,
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false, // not needed for react!!
        },
        fallbackLng: 'en-IN',
    });

// i18n.on('languageChanged', (lng) => {
//     console.log(
//         'the language changes msg from index js from localization ===>',
//         // moment.locale(lng)
//         lng
//     );
//     // return moment.locale(lng);
// });
