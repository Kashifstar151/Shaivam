import { Appearance } from 'react-native';
import { darkTheme, lightTheme } from '../Constants/globalCSS';
const colorScheme = Appearance.getColorScheme();
const darkCardGrad = { startColor: '#404040', stopColor: '#404040' };
const greyForCard = ['#333333', '#333333'];

export default {
    primaryColor: '#EDCB76',
    primaryDarkColor: '#0D0D0D',
    primaryOrangeColor: '#F9A84D;',
    darkPrimaryColor: '#3d2d1d',
    secondaryColor: '#F0F6F7',
    primaryWhite: '#FFFCFC',
    DodgerBlue: '#00BFFF',
    DeepSkyBlue: '#00BFFF',
    secondaryRed: '#E75143',
    secondaryBlue: '#3AA7D8',
    black: '#000',
    black20: 'rgba(0, 0, 0, 0.2)',
    black40: 'rgba(0, 0, 0, 0.4)',
    black50: 'rgba(0, 0, 0, 0.5)',
    black70: 'rgba(0, 0, 0, 0.7)',
    white: '#fff',
    blackBlur: '#161616',
    darkOrange: 'darkorange',
    red: '#FF0100',
    overWeight: '#FFB100',

    blackBg: '#121212',
    transparent: 'transparent',
    brandPrimary: '#57b660',
    grey: '#A8A8A8',
    primaryGray: '#252526',
    greyInactive: '#b3b3b3',
    greyLight: '#bebebe',
    greySwitchBorder: '#5e6268',
    greyOff: '#3e3e3e',
    grey3: '#333',
    green: '#3cea65',
    offWhite: '#bfbbbb',
    grey1: '#f4f4f4',
    grey2: '#e9ecef',
    grey3: '#dee2e6',
    grey4: '#adb5bd',
    grey5: '#999999',
    grey6: '#777777',
    grey7: '#383838',
    grey8: '#1e1e1e',
    grey9: '#2C2C2C',
    black: '#121212',

    //dynamic color schema based on theme

    // global
    // screenTheme: colorScheme === 'dark' ? darkTheme : lightTheme,
    greyForCard: ['#333333', '#333333'],
    darkCardGrad: { startColor: '#404040', stopColor: '#404040' },
    faintGrey: '#333333',
    skinColor: '#F1DBDA',
    // yellow card
    yellowGradCard: ['#FEE8B3', '#FEE199'],

    // new format
    light: {
        ...lightTheme,
        // yellow
        yellowGradBallRight: { startColor: '#FFD87A', stopColor: '#FFE9B4' },
        yellowGradBallLeft: { startColor: '#FFF3D6', stopColor: '#FEDC8B' },
        yellowGradcolors: ['#FEE8B3', '#FEE199'],

        // red
        redGradcolors: ['#E5B8B5', '#FD9991'],
        redGradBallRight: { startColor: '#FD9991', stopColor: '#E5B8B5' },
        redGradBallLeft: { startColor: '#FFF3D6', stopColor: '#E5B8B5' },

        // green
        greenGradcolors: ['#AFD9BB', '#60B278'],
        greenGradBallRight: { startColor: '#BAE6C6', stopColor: '#8EC99F' },
        greenGradBallLeft: { startColor: '#BAE6C6', stopColor: '#8EC99F' },

        // search box

        searchBox: { bgColor: '#8F3630', textColor: '#FF9D9D' },

        searchContext: {
            unSelected: { bgColor: '#8F3630', textColor: '#FF9D9D' },
            selected: { bgColor: '#F3DDDC', textColor: '#8F3630' },
        },

        // iconHeadingColor
        iconHeadingColor: {
            inactive: '#FFE0E0',
            active: '#8F3630',
            bgColor: '#F3DDDC',
            activeTextColor: '#8F3630',
            inactiveTextColor: '#F3DDDC',
        },

        setting: {
            backgroundColor: '#F3DDDC',
            headingTxtColor: '#C1544E',
            borderColor: '#C1554E',
        },

        settingText: {
            color: '#C1544E',
        },

        lyricsText: {
            color: '#000',
        },

        settingBtn: {
            backgroundColor: '#F3DDDC',
        },

        // homepage

        // --->card start
        gradientHomeCardYellow: ['#FEE8B3', '#FDD166'],
        gradientHomeCardGreen: ['#AFD9BB', '#60B278'],
        textColorHomeCardYellow: '#4C3600',
        // --->card end
        //headerComp
        headerComp: { selected: '#C1544E', unSelected: '#FFAAA4' },
        // bootomTabNav
        bottomTabItemColor: { selected: '#FFFFFF', unSelected: '#FFAAA4' },
    },
    dark: {
        ...darkTheme,
        // yellow
        yellowGradBallRight: darkCardGrad,
        yellowGradBallLeft: darkCardGrad,
        yellowGradcolors: greyForCard,

        // red
        redGradcolors: greyForCard,
        redGradBallRight: darkCardGrad,
        redGradBallLeft: darkCardGrad,

        // green
        greenGradcolors: greyForCard,
        greenGradBallRight: darkCardGrad,
        greenGradBallLeft: darkCardGrad,

        // search box

        searchContext: {
            unSelected: { bgColor: '#353535', textColor: '#777777' },
            selected: { bgColor: '#C1554E', textColor: '#FFFFFF' },
        },

        searchBox: { bgColor: '#2A2A2A', textColor: '#777777' },

        // iconHeadingColor,
        iconHeadingColor: {
            inactive: '#777777',
            active: '#FFFFFF',
            bgColor: '#C2534C',
            activeTextColor: '#8F3630',
            inactiveTextColor: '#FFE0E0',
        },

        // setting
        setting: {
            backgroundColor: '#333333',
            headingTxtColor: '#C1544E',
            borderColor: '#C1554E',
        },

        settingText: {
            color: '#FFFFFF',
        },

        lyricsText: {
            color: '#777777',
        },

        settingBtn: {
            backgroundColor: '#333333',
        },

        // homepage

        // --->card start
        gradientHomeCardYellow: greyForCard,
        gradientHomeCardGreen: greyForCard,
        textColorHomeCardYellow: '#fff',
        // --->card end

        //bottomTabNav
        bottomTabItemColor: { selected: '#FFFFFF', unSelected: '#555555' },
    },

    // red card
    redGradCard: ['#E5B8B5', '#FD9991'],

    // green card
    greenGradCard: ['#AFD9BB', '#60B278'],
};
