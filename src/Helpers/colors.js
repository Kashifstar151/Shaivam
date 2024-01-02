import { Appearance } from 'react-native';
import { dark, light } from '../Constants/globalCSS';
const colorScheme = Appearance.getColorScheme();
console.log("🚀 ~ file: colors.js:4 ~ colorScheme:", colorScheme)
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
    screenTheme: colorScheme === 'dark' ? dark : light,
    greyForCard: ['#333333', '#333333'],
    darkCardGrad: { startColor: '#404040', stopColor: '#404040' },

    // yellow card
    yellowGradCard: ['#FEE8B3', '#FEE199'],
    yellowGradBallRight: function () {
        return colorScheme === 'light'
            ? { startColor: '#FFD87A', stopColor: '#FFE9B4' }
            : this.darkCardGrad;
    },
    yellowGradBallLeft: function () {
        return colorScheme === 'light'
            ? { startColor: '#FFF3D6', stopColor: '#FEDC8B' }
            : this.darkCardGrad;
    },
    yellowGradcolors: function () {
        return colorScheme === 'light' ? this.yellowGradCard : this.greyForCard;
    },

    // red card
    redGradCard: ['#E5B8B5', '#FD9991'],
    redGradcolors: function () {
        return colorScheme === 'light' ? this.redGradCard : this.greyForCard;
    },
    redGradBallRight: function () {
        return colorScheme === 'light'
            ? { startColor: '#FD9991', stopColor: '#E5B8B5' }
            : this.darkCardGrad;
    },
    redGradBallLeft: function () {
        return colorScheme === 'light'
            ? { startColor: '#FFF3D6', stopColor: '#E5B8B5' }
            : this.darkCardGrad;
    },

    // green card
    greenGradCard: ['#AFD9BB', '#60B278'],
    greenGradcolors: function () {
        return colorScheme === 'light' ? this.greenGradCard : this.greyForCard;
    },
    greenGradBallRight: function () {
        return colorScheme === 'light'
            ? { startColor: '#BAE6C6', stopColor: '#8EC99F' }
            : this.darkCardGrad;
    },
    greenGradBallLeft: function () {
        return colorScheme === 'light'
            ? { startColor: '#BAE6C6', stopColor: '#8EC99F' }
            : this.darkCardGrad;
    },
};
