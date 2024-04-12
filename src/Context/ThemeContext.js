import { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
// import { dark, light } from '../Constants/globalCSS';
import { dark, light } from '../Helpers/GlobalStyles';
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
    }, [colorscheme]);
    // useEffect(() => {
    //     getTheme();
    // }, [colorscheme]);
    // const getTheme = async () => {
    //     let key = await AsyncStorage.getItem('theme');
    //     console.log('🚀 ~ getTheme ~ key:21', key);
    //     let k = JSON.parse(key);
    //     if (key) {
    //         if (k === 'light') {
    //             // alert(true)
    //             setTheme(light);
    //         } else {
    //             // alert(false)
    //             setTheme(dark);
    //             console.log(true);
    //         }
    //     } else {
    //         // alert(key)
    //         setTheme(colorscheme === 'light' ? light : dark);
    //         AsyncStorage.setItem('theme', colorscheme);
    //     }
    // };
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
