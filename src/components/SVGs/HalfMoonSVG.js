import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function HalfMoonSVG({ fill, ...props }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            {...props}
        >
            <Path
                d="M8 2a6 6 0 100 12A6 6 0 008 2zm.5 11V3.025A5 5 0 018.5 13z"
                fill={fill}
                // color="#612B27"
            />
        </Svg>
    );
}

export default HalfMoonSVG;
