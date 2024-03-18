import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function FavSVG({ fill, width = 16, height = 22, viewBox = '0 0 16 22', ...props }) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M12 1H4a3 3 0 00-3 3v16a1 1 0 001.5.87L8 17.69l5.5 3.18a1 1 0 00.5.13 1 1 0 00.5-.13A1 1 0 0015 20V4a3 3 0 00-3-3zm1 17.27l-4.5-2.6a1 1 0 00-1 0L3 18.27V4a1 1 0 011-1h8a1 1 0 011 1v14.27z"
                fill={fill}
                stroke="#fff"
                strokeWidth={0.2}
            />
        </Svg>
    );
}

export default FavSVG;
