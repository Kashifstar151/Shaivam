import { darkTheme, lightTheme } from '../Constants/globalCSS';
import colors from './colors';
export const gStyles = {
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
};

export const dark = {
    ...darkTheme,
    ...colors.dark,
};

export const light = {
    ...lightTheme,
    ...colors.light,
};
