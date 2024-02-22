import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function LanguageSVG({ fill, ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M19.061 18.67l-2.14-4.27-2.14 4.27M15.172 17.91h3.52"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M16.924 22a5.08 5.08 0 11.002-10.162A5.08 5.08 0 0116.924 22zM5.02 2h3.92c2.07 0 3.07 1 3.02 3.02v3.92c.05 2.07-.95 3.07-3.02 3.02H5.02C3 12 2 11 2 8.93V5.01C2 3 3 2 5.02 2zM9.005 5.85h-4.06M6.969 5.17v.68M7.987 5.84c0 1.75-1.37 3.17-3.05 3.17M9.006 9.01c-.73 0-1.39-.39-1.85-1.01M2 15c0 3.87 3.13 7 7 7l-1.05-1.75M22 9c0-3.87-3.13-7-7-7l1.05 1.75"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default LanguageSVG;
