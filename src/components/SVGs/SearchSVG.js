import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SearchSVG({ fill, width = 17, height = 17, viewBox = '0 0 17 17', ...props }) {
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
                d="M15.667 15.667l-3.498-3.498M14 7.75a6.25 6.25 0 10-12.5 0 6.25 6.25 0 0012.5 0z"
                stroke={fill}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default SearchSVG;
