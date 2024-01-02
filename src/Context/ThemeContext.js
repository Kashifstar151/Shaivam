import { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { dark, light } from '../Constants/globalCSS';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();
export const ThemeContextProvider = ({ children }) => {
    const colorscheme = useColorScheme();
    const [theme, setTheme] = useState(dark);

    useEffect(() => {
        if (colorscheme) {
            setTheme(colorscheme === 'light' ? light : dark);
            AsyncStorage.setItem('theme', colorscheme);
        }

        console.log('the theme of the screen==>', dark);
    }, [colorscheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: (theme) => setTheme(theme),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
