import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DirectionSVG({ fill, ...props }) {
    return (
        <Svg
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M10.267 1.561a2.5 2.5 0 00-3.536 0l-4.67 4.671a2.559 2.559 0 000 3.535l4.67 4.673a2.578 2.578 0 003.536 0l4.671-4.673a2.524 2.524 0 000-3.535l-4.67-4.671zm3.964 7.5l-4.67 4.672a1.504 1.504 0 01-2.123 0L2.768 9.06a1.528 1.528 0 010-2.121l4.67-4.671a1.5 1.5 0 012.122 0l4.671 4.671a1.521 1.521 0 010 2.122z"
                fill={fill}
            />
            <Path
                d="M11.46 7.31a.475.475 0 00-.107-.164l-1.5-1.5a.5.5 0 00-.707.707L9.793 7H7a.5.5 0 00-.5.5V10a.5.5 0 001 0V8h2.293l-.646.646a.5.5 0 000 .707.507.507 0 00.707 0l1.5-1.5a.516.516 0 00.106-.544z"
                fill={fill}
            />
        </Svg>
    );
}

export default DirectionSVG;
