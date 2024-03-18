import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ShareSVG({ fill, viewBox = '0 0 24 24', width = 24, height = 24, ...props }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M8.684 10.658l6.629-3.314m.003 9.314l-6.622-3.311M21 6a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zm12 6a3 3 0 11-6 0 3 3 0 016 0z"
                stroke={fill}
                strokeWidth={1.5}
            />
        </Svg>
    );
}

export default ShareSVG;
