import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BackBtnSVG({ fill, ...props }) {
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
                d="M3 11.254a.75.75 0 00.215.519l.004.009 4.5 4.5a.75.75 0 001.06-1.06L5.562 12H20.25a.75.75 0 100-1.5H5.56l3.22-3.22a.75.75 0 00-1.061-1.06l-4.5 4.5-.004.008a.733.733 0 00-.156.235.73.73 0 00-.059.287v.003z"
                fill={fill}
            />
        </Svg>
    );
}

export default BackBtnSVG;
