import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function GoToWebSVG({ fill, ...props }) {
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
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke={fill}
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M8.002 3h1a28.424 28.424 0 000 18h-1M15 3a28.424 28.424 0 010 18"
                stroke={fill}
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M3 16v-1a28.424 28.424 0 0018 0v1M3 9a28.424 28.424 0 0118 0"
                stroke={fill}
                strokeWidth={1.1}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default GoToWebSVG;
