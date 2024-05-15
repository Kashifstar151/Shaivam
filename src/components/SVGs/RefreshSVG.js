import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function RefreshSVG({ fill, width = 24, height = 24, viewBox = '0 0 24 24', ...props }) {
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
                d="M17.82 17.852a8.278 8.278 0 01-5.853 2.424c-4.54 0-8.276-3.736-8.276-8.276 0-4.54 3.736-8.276 8.276-8.276 4.54 0 8.276 3.736 8.276 8.276"
                stroke={fill}
                strokeWidth={1.5}
                strokeMiterlimit={10}
            />
            <Path
                d="M18.512 10.208h3.457a.338.338 0 01.34.344c0 .06-.017.119-.048.17l-1.729 2.904a.339.339 0 01-.584 0l-1.729-2.904a.341.341 0 01.293-.514z"
                fill={fill}
            />
        </Svg>
    );
}

export default RefreshSVG;
