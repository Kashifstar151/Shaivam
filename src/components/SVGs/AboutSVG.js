import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function AboutSVG({ fill, ...props }) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10 5.01V5m0 10V8m9 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke={fill}
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default AboutSVG;
