import * as React from 'react';
import Svg, { G, Circle, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function PlayBtnSVG({ fill, ...props }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={36}
            height={36}
            viewBox="0 0 36 36"
            fill="none"
            {...props}
        >
            <G filter="url(#filter0_d_834_29283)">
                <Circle cx={18} cy={16} r={16} fill="#fff" />
            </G>
            <Path
                d="M14.666 11.531v8.939a.852.852 0 001.316.725l6.954-4.47a.868.868 0 000-1.458l-6.954-4.46a.852.852 0 00-1.316.724z"
                fill={fill}
            />
            <Defs></Defs>
        </Svg>
    );
}

export default PlayBtnSVG;
