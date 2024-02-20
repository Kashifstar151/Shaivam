import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function RateTheAppSVG({ fill, ...props }) {
    return (
        <Svg
            width={20}
            height={19}
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10 15l-6 3 1.5-6L1 7l6.5-.5L10 1l2.5 5.5L19 7l-4.5 5 1.5 6-6-3z"
                stroke={fill}
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default RateTheAppSVG;
