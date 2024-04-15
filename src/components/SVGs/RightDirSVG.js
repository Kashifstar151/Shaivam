import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function RightDirSVG({ fill, width = 18, height = 19, viewBox = '0 0 18 19', ...props }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            {...props}
        >
            <Path
                d="M15.75 8.94a.562.562 0 01-.16.39l-.004.006-3.375 3.375a.563.563 0 01-.796-.795L13.83 9.5H2.812a.563.563 0 010-1.125H13.83l-2.415-2.414a.562.562 0 01.796-.795l3.375 3.375.003.005a.55.55 0 01.161.392v.002z"
                // fill="#C1554E"
                fill={fill}
            />
        </Svg>
    );
}

export default RightDirSVG;
