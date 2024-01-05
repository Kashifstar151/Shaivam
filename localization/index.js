import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import 'moment/min/locales';
import moment from 'moment';
import en from './en';
import hi from './hi';

export const AVAILABLE_LANGUAGES = {
    en,
    hi,
};

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    // init: (_services: Services, _detectorOptions: object, _i18nextOptions: InitOptions) => {
    //     /* use services and options */
    // },
    init: () => {},
    // detect: (callback: (lng: string) => void) => {
    //     AsyncStorage.getItem('APP_LANG', (err, lng) => {
    //         // Handle error fetching stored data or no data stored case
    //         if (err || !lng) {
    //             if (err) {
    //                 console.log('Error fetching "APP_LANG" from async store', err);
    //             } else {
    //                 console.log(
    //                     'No language is set, choosing the best available or English as fallback'
    //                 );
    //             }
    //             const bestLng = RNLocalize.findBestLanguageTag(AVALAILABLE_LANG_CODES);

    //             callback(bestLng?.languageTag ?? 'en');
    //             return;
    //         }
    //         callback(lng);
    //     });
    // },

    detect: function (callback) {
        try {
            //get stored language from Async storage
            AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                if (language) {
                    //if language was stored before, use this language in the app
                    callback(language);
                } else {
                    //if language was not stored yet, use device's locale
                    callback(RNLocalize.getLocales().map((locale) => locale.languageCode)[0]);
                }
            });
        } catch (error) {
            console.log('Error reading language', error);
        }
    },
    cacheUserLanguage: (lng) => AsyncStorage.setItem(STORE_LANGUAGE_KEY, lng),

    /*
  
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          return callback(Localization.locale);
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
  */
};

i18n.use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: AVAILABLE_LANGUAGES,
        react: {
            useSuspense: false,
        },
        // interpolation: {
        //     escapeValue: false,
        //     format: function (value: any, format?: string, lng?: string) {
        //         switch (format) {
        //             case 'flags':
        //                 if (typeof value !== 'number' || value < 1 || !Number.isInteger(value)) {
        //                     return value;
        //                 }
        //                 if (lng === 'hi') {
        //                     return [...Array(value as number)].map((_) => '🇮🇳').join(' ');
        //                 } else {
        //                     return [...Array(value as number)].map((_) => '🌎').join(' ');
        //                 }
        //             default:
        //                 return value;
        //         }
        //     },
        // },

        interpolation: {
            escapeValue: false, // not needed for react!!
        },
        fallbackLng: 'en',
        defaultNS: 'common',
    });

i18n.on('languageChanged', (lng) => moment.locale(lng));
