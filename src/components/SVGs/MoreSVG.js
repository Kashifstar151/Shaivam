import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function MoreSVG({ fill, height = 4, width = 18, viewBox = '0 0 18 4', ...props }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            {...props}
        >
            <G clipPath="url(#clip0_2497_1104)">
                <Path
                    d="M2 2h.01M9 2h.01M16 2h.01M3 2c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm7 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm7 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"
                    stroke={fill}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_2497_1104">
                    <Path fill={fill} d="M0 0H18V4H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export default MoreSVG;
