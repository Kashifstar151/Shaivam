import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function WebSearchSVG({ fill, ...props }) {
    return (
        <Svg
            width={19}
            height={20}
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M18 18.5l-4.197-4.197M16 9A7.5 7.5 0 101 9a7.5 7.5 0 0015 0z"
                stroke={fill}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default WebSearchSVG;
