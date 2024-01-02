import { dark, light } from '../Constants/globalCSS';
import colors from './colors';
export const gStyles = {
    marginTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
};

export const dark = {
    ...dark,
    ...colors.dark,
};

export const light = {
    ...light,
    ...colors.light,
};
